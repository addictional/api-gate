import { ApiProperty } from '@nestjs/swagger';

export default class IGetFlights {
  @ApiProperty({
    default: 'MOW-LED',
    description: 'Коды городов/аэропортов откуда - куда',
  })
  fromTo1: string;

  @ApiProperty({
    default: '2022-05-12',
    description: 'Дата вылета',
  })
  date1: string;

  @ApiProperty({
    default: 1,
    description: 'Количество взрослых',
  })
  adults: number;

  @ApiProperty({
    default: 0,
    description: 'Количество детей',
  })
  children: number;

  @ApiProperty({
    default: 0,
    description: 'Количество младенцев',
  })
  infants: number;

  @ApiProperty({
    default: 'economy',
    description: 'Класс перелёта',
  })
  serviceclass: string;

  @ApiProperty({
    default: false,
  })
  onlydirect: boolean;

  @ApiProperty({
    default: 'z',
  })
  salesChannel: string;
}
