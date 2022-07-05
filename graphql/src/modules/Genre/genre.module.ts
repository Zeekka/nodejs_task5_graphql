import { Module } from '@nestjs/common';
import { GenreResolver } from './genre.resolver.js';

@Module({
  providers: [GenreResolver],
})
export class GenreModule {}
