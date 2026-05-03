import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AyahService } from './ayah.service';
import { sendResponse } from '../../utils/sendResponse';

@Controller('api/v1/ayahs')
export class AyahController {
  constructor(private readonly ayahService: AyahService) {}

  @Get('global/:n')
  async getAyahByGlobalNumber(@Param('n', ParseIntPipe) n: number) {
    const result = await this.ayahService.getAyahByGlobalNumber(n);

    return sendResponse({
      message: 'Ayah fetched successfully',
      data: result,
    });
  }

  @Get(':id')
  async getAyahById(@Param('id') id: string) {
    const result = await this.ayahService.getAyahById(id);

    return sendResponse({
      message: 'Ayah fetched successfully',
      data: result,
    });
  }
}