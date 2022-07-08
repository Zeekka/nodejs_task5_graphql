import { Module } from '@nestjs/common';
import { FavouriteResolver } from './favourite.resolver.js';
import { FavouriteRepository } from './providers/favourite.repository.js';
import { MongooseModule } from '@nestjs/mongoose';
import { Favourite, favouriteSchema } from './model/favourite.model.js';
import { BandModule } from '../Band/band.module.js';
import { ArtistModule } from '../Artist/artist.module.js';
import { GenreModule } from '../Genre/genre.module.js';
import { TrackModule } from '../Track/track.module.js';

const mongooseModule = MongooseModule.forFeature([
  { name: Favourite.name, schema: favouriteSchema },
]);

@Module({
  imports: [mongooseModule, BandModule, ArtistModule, GenreModule, TrackModule],
  providers: [FavouriteResolver, FavouriteRepository],
  exports: [mongooseModule],
})
export class FavouriteModule {}
