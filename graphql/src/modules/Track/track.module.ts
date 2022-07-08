import { Module } from '@nestjs/common';
import { TrackResolver } from './track.resolver.js';
import { TracksRepository } from './providers/tracks.repository.js';
import { MongooseModule } from '@nestjs/mongoose';
import { Track, TracksSchema } from './model/track.model.js';
import { GenreModule } from '../Genre/genre.module.js';
import { BandModule } from '../Band/band.module.js';

const mongooseModule = MongooseModule.forFeature([
  { name: Track.name, schema: TracksSchema },
]);

@Module({
  imports: [mongooseModule, GenreModule, BandModule],
  providers: [TrackResolver, TracksRepository],
  exports: [mongooseModule],
})
export class TrackModule {}
