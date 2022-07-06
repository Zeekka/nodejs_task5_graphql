import {
  Args,
  ID,
  Int,
  Mutation,
  Query,
  ResolveField,
  Resolver,
  Parent,
} from '@nestjs/graphql';
import { Genre, GenreDocument } from './model/genre.model.js';
import { GenreRepository } from './providers/genre.repository.js';
import { GenreDto } from './dto/genre.dto.js';

@Resolver((of) => Genre)
export class GenreResolver {
  constructor(private genreRepository: GenreRepository) {}

  @Query((returns) => Genre)
  async genre(@Args('id') id: string): Promise<Genre> {
    return this.genreRepository.findOneById(id);
  }

  @Query((returns) => [Genre])
  async genres(): Promise<Genre[]> {
    return this.genreRepository.findAll();
  }

  @ResolveField('id', () => ID)
  async id(@Parent() genre: GenreDocument): Promise<string> {
    return genre._id.toString();
  }

  @Mutation((returns) => Genre)
  async createGenre(
    @Args({ name: 'name', type: () => String, nullable: true }) name: string,
    @Args({ name: 'description', type: () => String, nullable: true })
    description: string,
    @Args({ name: 'country', type: () => String, nullable: true })
    country: string,
    @Args({ name: 'year', type: () => Int, nullable: true }) year: number,
  ) {
    const genreDto = new Genre();
    genreDto.name = name;
    genreDto.description = description;
    genreDto.country = country;
    genreDto.year = year;

    return this.genreRepository.createGenre(genreDto);
  }

  @Mutation((returns) => Genre)
  async deleteGenre(@Args('id') id: string) {
    return this.genreRepository.deleteGenre(id);
  }

  @Mutation((returns) => Genre)
  async updateGenre(
    @Args({ name: 'id', type: () => ID }) id: string,
    @Args({ name: 'name', type: () => String, nullable: true }) name: string,
    @Args({ name: 'description', type: () => String, nullable: true })
    description: string,
    @Args({ name: 'country', type: () => String, nullable: true })
    country: string,
    @Args({ name: 'year', type: () => Int, nullable: true }) year: number,
  ) {
    const genreDto = new GenreDto();
    genreDto.name = name;
    genreDto.description = description;
    genreDto.country = country;
    genreDto.year = year;

    return this.genreRepository.updateGenre(id, genreDto);
  }
}
