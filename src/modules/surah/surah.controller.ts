import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { SurahService } from './surah.service';
import { sendResponse } from '../../common/utils/sendResponse';

@Controller('api/v1/surahs')
export class SurahController {
  constructor(private readonly surahService: SurahService) {}

  @Get()
  async getAllSurahs() {
    const result = await this.surahService.getAllSurahs();

    return sendResponse({
      message: 'Surahs fetched successfully',
      data: result,
    });
  }

  @Get(':id')
  async getSurahById(@Param('id', ParseIntPipe) id: number) {
    const result = await this.surahService.getSurahById(id);

    return sendResponse({
      message: 'Surah fetched successfully',
      data: result,
    });
  }

  @Get(':id/ayahs')
  async getSurahWithAyahs(@Param('id', ParseIntPipe) id: number) {
    const result = await this.surahService.getSurahWithAyahs(id);

    return sendResponse({
      message: 'Surah with ayahs fetched successfully',
      data: result,
    });
  }
}