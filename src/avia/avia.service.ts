import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { FlightSearchNormalizer } from './normalizers/FlightSearch.normalizer';
import { IGetFlights, GetFlightsQueryDto, FlightSearchResponse } from './dto';
import { map } from 'rxjs';

@Injectable()
export class AviaService {
  constructor(
    private httpService: HttpService,
    private flightSearchNormalizer: FlightSearchNormalizer,
  ) {}

  searchFlights(
    params: IGetFlights & { fromTo2?: string; date2?: string },
    query: GetFlightsQueryDto,
  ) {
    return this.httpService
      .get<FlightSearchResponse>(
        `http://tvm-docker-01:11105/api/flightSearch/${params.fromTo1}/${params.date1}/${params.adults}-${params.children}-${params.infants}/${params.serviceclass}/${params.onlydirect}/${params.salesChannel}`,
        { params: query },
      )
      .pipe(
        map((res) => res.data),
        map((data) =>
          this.flightSearchNormalizer.transformResponse(data, !!params.fromTo2),
        ),
      );
  }

  getPromotions() {
    return this.httpService
      .get('http://tvm-docker-01:11115/promotions/promotions')
      .pipe(map((res) => res.data));
  }
}
