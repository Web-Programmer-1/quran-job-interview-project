import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import {
  PrismaClient,
  RevelationPlace,
} from "../src/generated/prisma/client";

import surahs from "./data/surahs.json";
import arabicAyahs from "./data/quran_arabic.json";
import translations from "./data/translation_en.json";

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
  }),
});

async function main() {
  console.log("🌱 Quran full seed started...");

  await prisma.translation.deleteMany();
  await prisma.ayah.deleteMany();
  await prisma.surah.deleteMany();

  console.log("🧹 Old data deleted");

  for (const surah of surahs as any[]) {
    await prisma.surah.create({
      data: {
        id: surah.id,
        nameArabic: surah.nameArabic,
        nameEnglish: surah.nameEnglish,
        nameMeaning: surah.nameMeaning,
        revelationPlace:
          surah.revelationPlace === "MAKKAH"
            ? RevelationPlace.MAKKAH
            : RevelationPlace.MADINAH,
        ayahCount: surah.ayahCount,
      },
    });
  }

  console.log(`✅ Surahs inserted: ${(surahs as any[]).length}`);

  const translationMap = new Map<string, string>();

  for (const item of translations as any[]) {
    translationMap.set(`${item.surahId}:${item.ayahNumber}`, item.text);
  }

  let ayahCount = 0;
  let translationCount = 0;

  for (const ayah of arabicAyahs as any[]) {
    const createdAyah = await prisma.ayah.create({
      data: {
        surahId: ayah.surahId,
        ayahNumber: ayah.ayahNumber,
        globalNumber: ayah.globalNumber,
        arabicText: ayah.text,
      },
    });

    ayahCount++;

    const translationText = translationMap.get(
      `${ayah.surahId}:${ayah.ayahNumber}`,
    );

    if (translationText) {
      await prisma.translation.create({
        data: {
          ayahId: createdAyah.id,
          language: "en",
          translator: "Saheeh International",
          text: translationText,
        },
      });

      translationCount++;
    }
  }

  console.log(`✅ Ayahs inserted: ${ayahCount}`);
  console.log(`✅ Translations inserted: ${translationCount}`);
  console.log("🎉 Quran seed completed successfully");
}

main()
  .catch((error) => {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });