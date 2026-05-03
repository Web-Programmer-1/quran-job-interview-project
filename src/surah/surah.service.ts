import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SurahService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllSurahs() {
    return this.prisma.surah.findMany({
      orderBy: { id: 'asc' },
      select: {
        id: true,
        nameArabic: true,
        nameEnglish: true,
        nameMeaning: true,
        revelationPlace: true,
        ayahCount: true,
      },
    });
  }

  async getSurahById(id: number) {
    const surah = await this.prisma.surah.findUnique({
      where: { id },
    });

    if (!surah) throw new NotFoundException('Surah not found');

    return surah;
  }

  async getSurahWithAyahs(id: number) {
    const surah = await this.prisma.surah.findUnique({
      where: { id },
      include: {
        ayahs: {
          orderBy: { ayahNumber: 'asc' },
          include: {
            translations: true,
          },
        },
      },
    });

    if (!surah) throw new NotFoundException('Surah not found');

    return surah;
  }
}