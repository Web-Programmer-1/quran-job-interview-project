import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

type SearchParams = {
  q?: string;
  lang: string;
  page: number;
  limit: number;
};

@Injectable()
export class SearchService {
  constructor(private readonly prisma: PrismaService) {}

  async searchAyahs({ q, lang, page, limit }: SearchParams) {
    const query = q?.trim();

    if (!query) {
      throw new BadRequestException('Search query is required');
    }

    const safePage = Math.max(page, 1);
    const safeLimit = Math.min(Math.max(limit, 1), 50);
    const skip = (safePage - 1) * safeLimit;

    const where =
      lang === 'ar'
        ? {
            arabicText: {
              contains: query,
              mode: 'insensitive' as const,
            },
          }
        : lang === 'en'
          ? {
              translations: {
                some: {
                  text: {
                    contains: query,
                    mode: 'insensitive' as const,
                  },
                },
              },
            }
          : {
              OR: [
                {
                  arabicText: {
                    contains: query,
                    mode: 'insensitive' as const,
                  },
                },
                {
                  translations: {
                    some: {
                      text: {
                        contains: query,
                        mode: 'insensitive' as const,
                      },
                    },
                  },
                },
              ],
            };

    const [total, ayahs] = await Promise.all([
      this.prisma.ayah.count({ where }),
      this.prisma.ayah.findMany({
        where,
        skip,
        take: safeLimit,
        orderBy: { globalNumber: 'asc' },
        include: {
          surah: {
            select: {
              id: true,
              nameArabic: true,
              nameEnglish: true,
              nameMeaning: true,
              revelationPlace: true,
            },
          },
          translations: {
            select: {
              language: true,
              translator: true,
              text: true,
            },
          },
        },
      }),
    ]);

    return {
      query,
      page: safePage,
      limit: safeLimit,
      total,
      totalPages: Math.ceil(total / safeLimit),
      results: ayahs.map((ayah) => ({
        id: ayah.id,
        surahId: ayah.surahId,
        ayahNumber: ayah.ayahNumber,
        globalNumber: ayah.globalNumber,
        arabicText: ayah.arabicText,
        translation: ayah.translations[0] ?? null,
        surah: ayah.surah,
      })),
    };
  }
}