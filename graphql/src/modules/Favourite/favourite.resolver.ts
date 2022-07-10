import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Artist } from '../Artist/model/artist.model.js';
import { Band } from '../Band/model/band.model.js';
import { Genre } from '../Genre/model/genre.model.js';
import { Track } from '../Track/model/track.model.js';
import { Favourite, FavouriteDocument } from './model/favourite.model.js';
import { FavouriteRepository } from './providers/favourite.repository.js';

@Resolver((of) => Favourite)
export class FavouriteResolver {
  constructor(private favouriteRepository: FavouriteRepository) {}

  @Query((returns) => Favourite)
  async favourite(@Args('id') id: string) {
    return this.favouriteRepository.findOneByUserId(id);
  }

  @ResolveField('id', () => ID)
  async id(@Parent() favourite: FavouriteDocument): Promise<string> {
    return favourite._id.toString();
  }

  @ResolveField('artists', (type) => [Artist])
  async artists(@Parent() favourite: Favourite) {
    return this.favouriteRepository.artists(favourite);
  }

  @ResolveField('bands', (type) => [Band])
  async bands(@Parent() favourite: Favourite) {
    return this.favouriteRepository.bands(favourite);
  }

  @ResolveField('genres', (type) => [Genre])
  async genres(@Parent() favourite: Favourite) {
    return this.favouriteRepository.genres(favourite);
  }

  @ResolveField('tracks', (type) => [Track])
  async tracks(@Parent() favourite: Favourite) {
    return this.favouriteRepository.tracks(favourite);
  }

  @Mutation((returns) => Favourite)
  async addTrackToFavourites(
    @Args({ name: 'userId', type: () => ID }) userId: string,
    @Args({ name: 'trackId', type: () => ID }) trackId: string,
  ) {
    return this.favouriteRepository.addTrackToFavourites(userId, trackId);
  }

  @Mutation((returns) => Favourite)
  async addBandToFavourites(
    @Args({ name: 'userId', type: () => ID }) userId: string,
    @Args({ name: 'bandId', type: () => ID }) bandId: string,
  ) {
    return this.favouriteRepository.addBandToFavourites(userId, bandId);
  }

  @Mutation((returns) => Favourite)
  async addArtistToFavourites(
    @Args({ name: 'userId', type: () => ID }) userId: string,
    @Args({ name: 'artistId', type: () => ID }) artistId: string,
  ) {
    return this.favouriteRepository.addArtistToFavourites(userId, artistId);
  }

  @Mutation((returns) => Favourite)
  async addGenreToFavourites(
    @Args({ name: 'userId', type: () => ID }) userId: string,
    @Args({ name: 'genreId', type: () => ID }) genreId: string,
  ) {
    return this.favouriteRepository.addGenreToFavourites(userId, genreId);
  }
}
