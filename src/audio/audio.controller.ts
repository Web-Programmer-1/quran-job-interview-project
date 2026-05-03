import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AudioService } from './audio.service';

@Controller('api/v1/audio')
export class AudioController {
  constructor(private readonly audioService: AudioService) {}

  @Get('reciters')
  getReciters() {
    return this.audioService.getReciters();
  }

  @Get(':surahId/:ayahNumber')
  getAyahAudio(
    @Param('surahId', ParseIntPipe) surahId: number,
    @Param('ayahNumber', ParseIntPipe) ayahNumber: number,
  ) {
    return this.audioService.getAyahAudio(surahId, ayahNumber);
  }
}