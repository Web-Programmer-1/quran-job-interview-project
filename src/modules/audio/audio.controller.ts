import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AudioService } from './audio.service';
import { sendResponse } from '../../utils/sendResponse';

@Controller('api/v1/audio')
export class AudioController {
  constructor(private readonly audioService: AudioService) {}

  @Get('reciters')
  async getReciters() {
    const result = await this.audioService.getReciters();

    return sendResponse({
      message: 'Reciters fetched successfully',
      data: result,
    });
  }

  @Get(':surahId/:ayahNumber')
  async getAyahAudio(
    @Param('surahId', ParseIntPipe) surahId: number,
    @Param('ayahNumber', ParseIntPipe) ayahNumber: number,
  ) {
    const result = await this.audioService.getAyahAudio(
      surahId,
      ayahNumber,
    );

    return sendResponse({
      message: 'Ayah audio fetched successfully',
      data: result,
    });
  }
}