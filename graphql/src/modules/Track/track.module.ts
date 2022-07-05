import { Module } from '@nestjs/common';
import { TrackResolver } from './track.resolver.js';

@Module({
  providers: [TrackResolver],
})
export class TrackModule {}
