import { forwardRef, Module } from '@nestjs/common';
import { ArtistResolver } from './artist.resolver.js';
import { ArtistRepository } from './providers/artist.repository.js';
import { MongooseModule } from '@nestjs/mongoose';
import { Artist, ArtistSchema } from './model/artist.model.js';
import { BandModule } from '../Band/band.module.js';

const mongooseModule = MongooseModule.forFeature([
  { name: Artist.name, schema: ArtistSchema },
]);

@Module({
  imports: [mongooseModule, forwardRef(() => BandModule)],
  providers: [ArtistResolver, ArtistRepository],
  exports: [mongooseModule],
})
export class ArtistModule {}
