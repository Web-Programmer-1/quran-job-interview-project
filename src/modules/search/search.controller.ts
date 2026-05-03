import {
  Controller,
  Get,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { SearchService } from './search.service';
import { sendResponse } from '../../utils/sendResponse';

@Controller('api/v1/search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  async searchAyahs(
    @Query('q') q: string,
    @Query('lang') lang = 'all',
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
  ) {
    const result = await this.searchService.searchAyahs({
      q,
      lang,
      page,
      limit,
    });

    return sendResponse({
      message: 'Search results fetched successfully',
      data: result.results,
      meta: {
        page: result.page,
        limit: result.limit,
        total: result.total,
        totalPages: result.totalPages,
      },
    });
  }
}