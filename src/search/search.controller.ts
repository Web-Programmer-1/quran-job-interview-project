import { Controller, Get, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('api/v1/search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  searchAyahs(
    @Query('q') q: string,
    @Query('lang') lang = 'all',
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
  ) {
    return this.searchService.searchAyahs({ q, lang, page, limit });
  }
}