import { Module } from '@nestjs/common';
import { AviaController } from './avia.controller';
import { AviaService } from './avia.service';
import { HttpModule } from '@nestjs/axios';
import { FlightSearchNormalizer } from './normalizers/FlightSearch.normalizer';

@Module({
  imports: [HttpModule],
  controllers: [AviaController],
  providers: [AviaService, FlightSearchNormalizer],
})
export class AviaModule {}
