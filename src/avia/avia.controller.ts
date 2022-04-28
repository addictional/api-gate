import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AviaService } from './avia.service';
import { GetFlightsDto, GetFlightsOneWayDto, GetFlightsQueryDto } from './dto';

@ApiTags('avia')
@Controller('avia')
export class AviaController {
  constructor(private readonly aviaService: AviaService) {}

  @Get(
    'search/flights/:fromTo1/:date1/:adults-:children-:infants/:serviceclass/:onlydirect/:salesChannel',
  )
  searchFlightsOneWay(
    @Param() params: GetFlightsOneWayDto,
    @Query() query: GetFlightsQueryDto,
  ) {
    return this.aviaService.searchFlights(params, query);
  }

  @Get(
    'search/flights/:fromTo1/:date1/:fromTo2/:date2/:adults-:children-:infants/:serviceclass/:onlydirect/:salesChannel',
  )
  searchFlights(
    @Param() params: GetFlightsDto,
    @Query() query: GetFlightsQueryDto,
  ) {
    return this.aviaService.searchFlights(params, query);
  }

  @Get('promotions')
  promotions() {
    return this.aviaService.getPromotions();
  }
}
