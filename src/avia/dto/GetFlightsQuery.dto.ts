import { ApiProperty } from '@nestjs/swagger';

export class GetFlightsQueryDto {
  @ApiProperty({ name: 'agentCode', type: 'string', required: false })
  agentCode?: string;

  @ApiProperty({ name: 'gds', type: 'string', required: false })
  gds?: string;

  @ApiProperty({ name: 'connections', type: 'number', required: false })
  connections?: number;

  @ApiProperty({ name: 'airlines', type: 'string', required: false })
  airlines?: string;

  @ApiProperty({ name: 'combine', type: 'boolean', required: false })
  combine?: boolean;

  @ApiProperty({ name: 'debug', type: 'boolean', required: false })
  debug?: boolean;
}
