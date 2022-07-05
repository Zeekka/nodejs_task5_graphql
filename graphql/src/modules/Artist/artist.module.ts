import { Module } from '@nestjs/common';
import { ArtistResolver } from './artist.resolver.js';

@Module({
  providers: [ArtistResolver],
})
export class ArtistModule {}
