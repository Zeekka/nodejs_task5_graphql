import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Band } from './model/band.model.js';
import * as crypto from 'crypto';
import { Artist } from '../Artist/model/artist.model.js';
import {
  artists as ImpArtist,
  bands as ImpBands,
  genres as ImpGenres,
} from '../temp_data_provider.js';
import { Genre } from '../Genre/model/genre.model.js';

let bands = ImpBands;
const artists = ImpArtist;
const genres = ImpGenres;

@Resolver((of) => Band)
export class BandResolver {
  @Query((returns) => Band)
  async band(@Args('id') id: string) {
    return bands.filter((band) => band.id === id).pop();
  }

  @Query((returns) => [Band])
  async bands() {
    return bands;
  }

  @ResolveField('members', (returns) => [Artist])
  async members(@Parent() band: Band) {
    return band.members.map((memberId) => {
      let artistObj;
      artists.forEach((artist) => {
        if (artist.id === memberId) {
          artistObj = artist;
        }
      });

      return artistObj;
    });
  }

  @ResolveField('genres', (returns) => [Genre])
  async genres(@Parent() band: Band) {
    return band.genres.map((genreId) => {
      let genreObj;
      genres.forEach((genre) => {
        if (genre.id === genreId) {
          genreObj = genre;
        }
      });

      return genreObj;
    });
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
    const id = crypto.randomBytes(15).toString('hex');
    const band = { id: id, name, origin, members, website, genres };
    bands.push(band);
    return band;
  }

  @Mutation((returns) => Band)
  async deleteBand(@Args('id') id: string) {
    let deletedBand;
    bands = bands.filter((band) => {
      if (band.id === id) {
        deletedBand = band;
        return false;
      }

      return true;
    });

    return deletedBand;
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
    let updatedBand;
    bands.forEach((band) => {
      if (band.id === id) {
        band.name = name;
        band.origin = origin;
        band.members = members;
        band.website = website;
        band.genres = genres;

        updatedBand = band;
      }
    });

    return updatedBand;
  }
}
