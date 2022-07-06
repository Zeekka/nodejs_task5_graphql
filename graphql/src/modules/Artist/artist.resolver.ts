import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Artist, ArtistDocument } from './model/artist.model.js';
import { Band } from '../Band/model/band.model.js';
import { ArtistRepository } from './providers/artist.repository.js';
import { ArtistDto } from './dto/artist.dto.js';
import { Document } from 'mongoose';

@Resolver((of) => Artist)
export class ArtistResolver {
  constructor(private artistRepository: ArtistRepository) {}

  @Query((returns) => Artist)
  async artist(@Args('id') id: string) {
    return this.artistRepository.findOneById(id);
  }

  @Query((returns) => [Artist])
  async artists() {
    return this.artistRepository.findAll();
  }

  @ResolveField('id', () => ID)
  async id(@Parent() artist: Document): Promise<string> {
    return artist._id.toString();
  }

  @ResolveField('bands', (type) => [Band])
  async bands(@Parent() artist: ArtistDocument) {
    return this.artistRepository.bands(artist);
  }

  @Mutation((returns) => Artist)
  async createArtist(
    @Args({ name: 'firstName', type: () => String, nullable: true })
    firstName: string,
    @Args({ name: 'secondName', type: () => String, nullable: true })
    secondName: string,
    @Args({ name: 'middleName', type: () => String, nullable: true })
    middleName: string,
    @Args({ name: 'birthDate', type: () => String, nullable: true })
    birthDate: string,
    @Args({ name: 'birthPlace', type: () => String, nullable: true })
    birthPlace: string,
    @Args({ name: 'country', type: () => String, nullable: true })
    country: string,
    @Args({ name: 'bands', type: () => [String], nullable: true })
    bands: string[],
    @Args({ name: 'instruments', type: () => [String], nullable: true })
    instruments: string[],
  ) {
    const artistDto = new ArtistDto();
    artistDto.firstName = firstName;
    artistDto.secondName = secondName;
    artistDto.middleName = middleName;
    artistDto.birthDate = birthDate;
    artistDto.birthPlace = birthPlace;
    artistDto.country = country;
    artistDto.bands = bands;
    artistDto.instruments = instruments;
    return this.artistRepository.createArtist(artistDto);
  }

  @Mutation((returns) => Artist)
  async deleteArtist(@Args('id') id: string) {
    return this.artistRepository.deleteArtist(id);
  }

  @Mutation((returns) => Artist)
  async updateArtist(
    @Args({ name: 'id', type: () => ID }) id: string,
    @Args({ name: 'firstName', type: () => String, nullable: true })
    firstName: string,
    @Args({ name: 'secondName', type: () => String, nullable: true })
    secondName: string,
    @Args({ name: 'middleName', type: () => String, nullable: true })
    middleName: string,
    @Args({ name: 'birthDate', type: () => String, nullable: true })
    birthDate: string,
    @Args({ name: 'birthPlace', type: () => String, nullable: true })
    birthPlace: string,
    @Args({ name: 'country', type: () => String, nullable: true })
    country: string,
    @Args({ name: 'bands', type: () => [String], nullable: true })
    bands: string[],
    @Args({ name: 'instruments', type: () => [String], nullable: true })
    instruments: string[],
  ) {
    const artistDto = new ArtistDto();
    artistDto.firstName = firstName;
    artistDto.secondName = secondName;
    artistDto.middleName = middleName;
    artistDto.birthPlace = birthPlace;
    artistDto.birthDate = birthDate;
    artistDto.country = country;
    artistDto.bands = bands;
    artistDto.instruments = instruments;

    return this.artistRepository.updateArtist(id, artistDto);
  }
}
