import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

const DEFAULT_RECITER = {
  id: 'mishary-rashid-alafasy',
  name: 'Mishary Rashid Alafasy',
  style: 'Murattal',
  baseUrl: 'https://everyayah.com/data/Alafasy_128kbps',
};

const RECITERS = [
  DEFAULT_RECITER,
  {
    id: 'abdul-basit-murattal',
    name: 'Abdul Basit Abdul Samad',
    style: 'Murattal',
    baseUrl: 'https://everyayah.com/data/Abdul_Basit_Murattal_192kbps',
  },
  {
    id: 'hudhaify',
    name: 'Ali Al Hudhaify',
    style: 'Murattal',
    baseUrl: 'https://everyayah.com/data/Hudhaify_128kbps',
  },
];

@Injectable()
export class AudioService {
  constructor(private readonly prisma: PrismaService) {}

  getReciters() {
    return {
      reciters: RECITERS.map(({ id, name, style }) => ({
        id,
        name,
        style,
      })),
      defaultReciter: DEFAULT_RECITER.id,
    };
  }

  async getAyahAudio(surahId: number, ayahNumber: number) {
    const ayah = await this.prisma.ayah.findUnique({
      where: {
        surahId_ayahNumber: {
          surahId,
          ayahNumber,
        },
      },
      select: {
        surahId: true,
        ayahNumber: true,
        globalNumber: true,
        surah: {
          select: {
            nameEnglish: true,
            nameArabic: true,
          },
        },
      },
    });

    if (!ayah) {
      throw new NotFoundException('Ayah not found');
    }

    const fileName = `${String(surahId).padStart(3, '0')}${String(
      ayahNumber,
    ).padStart(3, '0')}.mp3`;

    return {
      surahId: ayah.surahId,
      ayahNumber: ayah.ayahNumber,
      globalNumber: ayah.globalNumber,
      surah: ayah.surah,
      reciter: {
        id: DEFAULT_RECITER.id,
        name: DEFAULT_RECITER.name,
        style: DEFAULT_RECITER.style,
      },
      url: `${DEFAULT_RECITER.baseUrl}/${fileName}`,
    };
  }
}