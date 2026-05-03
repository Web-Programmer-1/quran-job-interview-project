import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AyahService } from './ayah.service';

@Controller('api/v1/ayahs')
export class AyahController {
  constructor(private readonly ayahService: AyahService) {}

  @Get('global/:n')
  getAyahByGlobalNumber(@Param('n', ParseIntPipe) n: number) {
    return this.ayahService.getAyahByGlobalNumber(n);
  }

  @Get(':id')
  getAyahById(@Param('id') id: string) {
    return this.ayahService.getAyahById(id);
  }
}