import { Module } from '@nestjs/common';
import { SurahController } from './surah.controller';
import { SurahService } from './surah.service';

@Module({
  controllers: [SurahController],
  providers: [SurahService]
})
export class SurahModule {}
