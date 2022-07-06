import { Module } from '@nestjs/common';
import { ArtistResolver } from './artist.resolver.js';
import { ArtistRepository } from './providers/artist.repository.js';
import { MongooseModule } from '@nestjs/mongoose';
import { Artist, ArtistSchema } from './model/artist.model.js';
import { BandModule } from '../Band/band.module.js';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Artist.name, schema: ArtistSchema }]),
    BandModule,
  ],
  providers: [ArtistResolver, ArtistRepository],
})
export class ArtistModule {}
