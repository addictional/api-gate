import { Module } from '@nestjs/common';
import { AviaModule } from './avia/avia.module';

@Module({
  imports: [AviaModule],
})
export class AppModule {}
