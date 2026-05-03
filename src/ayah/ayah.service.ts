import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AyahService {
  constructor(private readonly prisma: PrismaService) {}

  async getAyahById(id: string) {
    const ayah = await this.prisma.ayah.findUnique({
      where: { id },
      include: {
        surah: {
          select: {
            id: true,
            nameArabic: true,
            nameEnglish: true,
            nameMeaning: true,
            revelationPlace: true,
            ayahCount: true,
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
    });

    if (!ayah) {
      throw new NotFoundException('Ayah not found');
    }

    return {
      id: ayah.id,
      surahId: ayah.surahId,
      ayahNumber: ayah.ayahNumber,
      globalNumber: ayah.globalNumber,
      arabicText: ayah.arabicText,
      surah: ayah.surah,
      translation: ayah.translations[0] ?? null,
    };
  }

  async getAyahByGlobalNumber(globalNumber: number) {
    const ayah = await this.prisma.ayah.findUnique({
      where: { globalNumber },
      include: {
        surah: {
          select: {
            id: true,
            nameArabic: true,
            nameEnglish: true,
            nameMeaning: true,
            revelationPlace: true,
            ayahCount: true,
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
    });

    if (!ayah) {
      throw new NotFoundException('Ayah not found');
    }

    return {
      id: ayah.id,
      surahId: ayah.surahId,
      ayahNumber: ayah.ayahNumber,
      globalNumber: ayah.globalNumber,
      arabicText: ayah.arabicText,
      surah: ayah.surah,
      translation: ayah.translations[0] ?? null,
    };
  }
}