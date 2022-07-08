import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Band, BandDocument } from './model/band.model.js';
import { Artist } from '../Artist/model/artist.model.js';
import { Genre } from '../Genre/model/genre.model.js';
import { BandRepository } from './providers/band.repository.js';
import { BandDto } from './dto/band.dto.js';
import { Document } from 'mongoose';

@Resolver((of) => Band)
export class BandResolver {
  constructor(private bandRepository: BandRepository) {}

  @Query((returns) => Band)
  async band(@Args('id') id: string): Promise<Band> {
    return this.bandRepository.findOneById(id);
  }

  @Query((returns) => [Band])
  async bands(): Promise<Band[]> {
    return this.bandRepository.findAll();
  }

  @ResolveField('id', () => ID)
  async id(@Parent() band: Document): Promise<string> {
    return band._id.toString();
  }

  @ResolveField('members', (returns) => [Artist])
  async members(@Parent() band: BandDocument) {
    return this.bandRepository.members(band);
  }

  @ResolveField('genres', (returns) => [Genre])
  async genres(@Parent() band: Band) {
    return this.bandRepository.genres(band);
  }

  @Mutation((returns) => Band)
  async createBand(
    @Args({ name: 'name', type: () => String, nullable: true }) name: string,
    @Args({ name: 'origin', type: () => String, nullable: true })
    origin: string,
    @Args({ name: 'members', type: () => [String], nullable: true })
    members: string[],
    @Args({ name: 'website', type: () => String, nullable: true })
    website: string,
    @Args({ name: 'genres', type: () => [String], nullable: true })
    genres: string[],
  ) {
    const bandDto = new BandDto();
    bandDto.name = name;
    bandDto.origin = origin;
    bandDto.members = members;
    bandDto.website = website;
    bandDto.genres = genres;

    return this.bandRepository.createBand(bandDto);
  }

  @Mutation((returns) => Band)
  async deleteBand(@Args('id') id: string) {
    return this.bandRepository.deleteBand(id);
  }

  @Mutation((returns) => Band)
  async updateBand(
    @Args({ name: 'id', type: () => ID }) id: string,
    @Args({ name: 'name', type: () => String, nullable: true }) name: string,
    @Args({ name: 'origin', type: () => String, nullable: true })
    origin: string,
    @Args({ name: 'members', type: () => [String], nullable: true })
    members: string[],
    @Args({ name: 'website', type: () => String, nullable: true })
    website: string,
    @Args({ name: 'genres', type: () => [String], nullable: true })
    genres: string[],
  ) {
    const bandDto = new BandDto();
    bandDto.name = name;
    bandDto.origin = origin;
    bandDto.members = members;
    bandDto.website = website;
    bandDto.genres = genres;

    return this.bandRepository.updateBand(id, bandDto);
  }
}
