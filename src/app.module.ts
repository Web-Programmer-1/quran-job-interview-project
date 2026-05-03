import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PrismaModule } from '../prisma/prisma.module';
import { SurahModule } from './modules/surah/surah.module';
import { AyahModule } from './modules/ayah/ayah.module';
import { SearchModule } from './modules/search/search.module';
import { AudioModule } from './modules/audio/audio.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    SurahModule,
    AyahModule,
    SearchModule,
    AudioModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}