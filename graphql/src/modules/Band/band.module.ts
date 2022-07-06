import { Module } from '@nestjs/common';
import { BandResolver } from './band.resolver.js';
import { BandRepository } from './providers/band.repository.js';
import { MongooseModule } from '@nestjs/mongoose';
import { Band, BandSchema } from './model/band.model.js';

const mongooseModule = MongooseModule.forFeature([
  { name: Band.name, schema: BandSchema },
]);

@Module({
  imports: [mongooseModule],
  providers: [BandResolver, BandRepository],
  exports: [mongooseModule],
})
export class BandModule {}
