import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { SurahService } from './surah.service';

@Controller('api/v1/surahs')
export class SurahController {
  constructor(private readonly surahService: SurahService) {}

  @Get()
  getAllSurahs() {
    return this.surahService.getAllSurahs();
  }

  @Get(':id')
  getSurahById(@Param('id', ParseIntPipe) id: number) {
    return this.surahService.getSurahById(id);
  }

  @Get(':id/ayahs')
  getSurahWithAyahs(@Param('id', ParseIntPipe) id: number) {
    return this.surahService.getSurahWithAyahs(id);
  }
}