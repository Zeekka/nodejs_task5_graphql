import { Module } from '@nestjs/common';
import { AlbumResolver } from './album.resolver.js';

@Module({
  providers: [AlbumResolver],
})
export class AlbumModule {}
