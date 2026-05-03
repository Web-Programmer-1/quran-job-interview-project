-- CreateTable
CREATE TABLE "ayahs" (
    "id" TEXT NOT NULL,
    "surahId" INTEGER NOT NULL,
    "ayahNumber" INTEGER NOT NULL,
    "globalNumber" INTEGER NOT NULL,
    "arabicText" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ayahs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "surahs" (
    "id" INTEGER NOT NULL,
    "nameArabic" TEXT NOT NULL,
    "nameEnglish" TEXT NOT NULL,
    "nameMeaning" TEXT NOT NULL,
    "revelationPlace" "RevelationPlace" NOT NULL,
    "ayahCount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "surahs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "translations" (
    "id" TEXT NOT NULL,
    "ayahId" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "translator" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "translations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ayahs_globalNumber_key" ON "ayahs"("globalNumber");

-- CreateIndex
CREATE INDEX "ayahs_surahId_idx" ON "ayahs"("surahId");

-- CreateIndex
CREATE UNIQUE INDEX "ayahs_surahId_ayahNumber_key" ON "ayahs"("surahId", "ayahNumber");

-- CreateIndex
CREATE INDEX "surahs_nameArabic_idx" ON "surahs"("nameArabic");

-- CreateIndex
CREATE INDEX "translations_ayahId_idx" ON "translations"("ayahId");

-- CreateIndex
CREATE INDEX "translations_language_idx" ON "translations"("language");

-- AddForeignKey
ALTER TABLE "ayahs" ADD CONSTRAINT "ayahs_surahId_fkey" FOREIGN KEY ("surahId") REFERENCES "surahs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "translations" ADD CONSTRAINT "translations_ayahId_fkey" FOREIGN KEY ("ayahId") REFERENCES "ayahs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
