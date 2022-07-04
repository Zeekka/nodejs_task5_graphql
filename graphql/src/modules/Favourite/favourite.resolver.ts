import { Args, ID, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import * as crypto from 'crypto';
import {
    genres as ImpGenres,
    artists as ImpArtists,
    bands as ImpBands,
    tracks as ImpTracks,
    favourites as ImpFavourites,
} from '../temp_data_provider.js';
import { Artist } from '../Artist/model/artist.model.js';
import { Band } from '../Band/model/band.model.js';
import { Genre } from '../Genre/model/genre.model.js';
import { Track } from '../Track/model/track.model.js';
import { Favourite } from './model/favourite.model.js';

let genres = ImpGenres;
let artists = ImpArtists;
let bands = ImpBands;
let tracks = ImpTracks;
let favourites = ImpFavourites

@Resolver(of => Favourite)
export class FavouriteResolver {
    @Query(returns => [Favourite])
    async favourites() {
        return favourites;
    }

    @ResolveField('artists', type => [Artist])
    async artists(@Parent() favourite: Favourite) {
        return favourite.artists.map(artistId => {
            let artistObj;
            artists.forEach(artist => {
                if (artist.id === artistId) {
                    artistObj = artist;
                }
            });

            return artistObj;
        });
    }

    @ResolveField('bands', type => [Band])
    async bands(@Parent() favourite: Favourite) {
        return favourite.bands.map(bandId => {
            let bandObj;
            bands.forEach(band => {
                if (band.id === bandId) {
                    bandObj = band;
                }
            });

            return bandObj;
        });
    }

    @ResolveField('genres', type => [Genre])
    async genres(@Parent() favourite: Favourite) {
        return favourite.genres.map(genreId => {
            let genreObj;
            genres.forEach(genre => {
                if (genre.id === genreId) {
                    genreObj = genre;
                }
            });

            return genreObj;
        });
    }

    @ResolveField('tracks', type => [Track])
    async tracks(@Parent() favourite: Favourite) {
        return favourite.tracks.map(trackId => {
            let trackObj;
            tracks.forEach(track => {
                if (track.id === trackId) {
                    trackObj = track;
                }
            });

            return trackObj;
        });
    }

    @Mutation(returns => Favourite)
    async addTrackToFavourites(
        @Args({name: 'userId', type: () => ID}) userId: string,
        @Args({name: 'trackId', type: () => ID}) trackId: number,
    ) {
        let userFavorites;
        favourites.forEach(favourite => {
            if (favourite.userId === userId) {
                userFavorites = favourite;
            }
        });

        if (userFavorites === undefined) {
            const id = crypto.randomBytes(15).toString('hex');
            userFavorites = {
                id: id,
                userId: userId,
                bands: [],
                genres: [],
                artists: [],
                tracks: []
            }

            favourites.push(userFavorites);
        }

        userFavorites.tracks.push(trackId);
        return userFavorites;
    }

    @Mutation(returns => Favourite)
    async addBandToFavourites(
        @Args({name: 'userId', type: () => ID}) userId: string,
        @Args({name: 'bandId', type: () => ID}) bandId: number,
    ) {
        let userFavorites;
        favourites.forEach(favourite => {
            if (favourite.userId === userId) {
                userFavorites = favourite;
            }
        });

        if (userFavorites === undefined) {
            const id = crypto.randomBytes(15).toString('hex');
            userFavorites = {
                id: id,
                userId: userId,
                bands: [],
                genres: [],
                artists: [],
                tracks: []
            }

            favourites.push(userFavorites);
        }

        userFavorites.bands.push(bandId);
        return userFavorites;
    }

    @Mutation(returns => Favourite)
    async addArtistToFavourites(
        @Args({name: 'userId', type: () => ID}) userId: string,
        @Args({name: 'artistId', type: () => ID}) artistId: number,
    ) {
        let userFavorites;
        favourites.forEach(favourite => {
            if (favourite.userId === userId) {
                userFavorites = favourite;
            }
        });

        if (userFavorites === undefined) {
            const id = crypto.randomBytes(15).toString('hex');
            userFavorites = {
                id: id,
                userId: userId,
                bands: [],
                genres: [],
                artists: [],
                tracks: []
            }

            favourites.push(userFavorites);
        }

        userFavorites.artists.push(artistId);
        return userFavorites;
    }

    @Mutation(returns => Favourite)
    async addGenreToFavourites(
        @Args({name: 'userId', type: () => ID}) userId: string,
        @Args({name: 'genreId', type: () => ID}) genreId: number,
    ) {
        let userFavorites;
        favourites.forEach(favourite => {
            if (favourite.userId === userId) {
                userFavorites = favourite;
            }
        });

        if (userFavorites === undefined) {
            const id = crypto.randomBytes(15).toString('hex');
            userFavorites = {
                id: id,
                userId: userId,
                bands: [],
                genres: [],
                artists: [],
                tracks: []
            }

            favourites.push(userFavorites);
        }

        userFavorites.genres.push(genreId);
        return userFavorites;
    }
}
