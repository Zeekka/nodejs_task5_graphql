import { Module } from '@nestjs/common';
import { GenreResolver } from './genre.resolver.js';
import { MongooseModule } from '@nestjs/mongoose';
import { Genre, GenreSchema } from './model/genre.model.js';
import { GenreRepository } from './providers/genre.repository.js';

const mongooseModule = MongooseModule.forFeature([
  { name: Genre.name, schema: GenreSchema },
]);

@Module({
  imports: [mongooseModule],
  providers: [GenreResolver, GenreRepository],
  exports: [mongooseModule],
})
export class GenreModule {}
