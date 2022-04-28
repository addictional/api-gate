import { ApiProperty } from '@nestjs/swagger';
import IGetFlights from './IGetFlights';

export class GetFlightsDto extends IGetFlights {
  @ApiProperty({
    default: 'LED-MOW',
    description: 'Коды городов/аэропортов откуда - куда',
  })
  fromTo2: string;

  @ApiProperty({
    default: '2022-05-20',
  })
  date2: string;
}
