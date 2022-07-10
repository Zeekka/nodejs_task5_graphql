import { forwardRef, Module } from '@nestjs/common';
import { AlbumResolver } from './album.resolver.js';
import { AlbumRepository } from './providers/album.repository.js';
import { MongooseModule } from '@nestjs/mongoose';
import { Album, AlbumSchema } from './model/album.model.js';
import { BandModule } from '../Band/band.module.js';
import { ArtistModule } from '../Artist/artist.module.js';
import { GenreModule } from '../Genre/genre.module.js';
import { TrackModule } from '../Track/track.module.js';

const mongooseModule = MongooseModule.forFeature([
  { name: Album.name, schema: AlbumSchema },
]);

@Module({
  imports: [
    mongooseModule,
    BandModule,
    ArtistModule,
    GenreModule,
    forwardRef(() => TrackModule),
  ],
  providers: [AlbumResolver, AlbumRepository],
  exports: [mongooseModule],
})
export class AlbumModule {}
