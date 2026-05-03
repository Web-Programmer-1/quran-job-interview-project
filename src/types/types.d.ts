export interface Surah {
  id: number;
  nameArabic: string;
  nameEnglish: string;
  nameMeaning: string;
  revelationPlace: RevelationPlace;
  ayahCount: number;

  ayahs?: Ayah[];

  createdAt: Date;
  updatedAt: Date;
}