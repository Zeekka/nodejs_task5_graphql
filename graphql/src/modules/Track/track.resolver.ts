import { Args, ID, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import * as crypto from 'crypto';
import {
    genres as ImpGenres,
    albums as ImpAlbums,
    artists as ImpArtists,
    bands as ImpBands,
    tracks as ImpTracks
} from '../temp_data_provider.js';
import { Track } from './model/track.model.js';
import { Band } from '../Band/model/band.model.js';
import { Genre } from '../Genre/model/genre.model.js';
import { Album } from '../Album/model/album.model.js';

let genres = ImpGenres;
let albums = ImpAlbums;
let bands = ImpBands;
let tracks = ImpTracks

@Resolver(of => Track)
export class TrackResolver {
    @Query(returns => Track)
    async track(@Args('id') id: string) {
        return tracks.filter((track) => track.id === id).pop();
    }

    @Query(returns => [Track])
    async tracks() {
        return tracks;
    }

    @ResolveField('albums', type => [Album])
    async artists(@Parent() track: Track) {
        return track.albums.map(albumId => {
            let albumObj;
            albums.forEach(album => {
                if (album.id === albumId) {
                    albumObj = album;
                }
            });

            return albumObj;
        });
    }

    @ResolveField('bands', type => [Band])
    async bands(@Parent() track: Track) {
        return track.bands.map(bandId => {
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
    async genres(@Parent() track: Track) {
        return track.genres.map(genreId => {
            let genreObj;
            genres.forEach(genre => {
                if (genre.id === genreId) {
                    genreObj = genre;
                }
            });

            return genreObj;
        });
    }

    @Mutation(returns => Track)
    async createTrack(
        @Args({name: 'title', type: () => String, nullable: true}) title: string,
        @Args({name: 'albums', type: () => [String], nullable: true}) albums: string[],
        @Args({name: 'bands', type: () => [String], nullable: true}) bands: string[],
        @Args({name: 'duration', type: () => Int, nullable: true}) duration: number,
        @Args({name: 'released', type: () => Int, nullable: true}) released: number,
        @Args({name: 'genres', type: () => [String], nullable: true}) genres: string[],
    ) {
        const id = crypto.randomBytes(15).toString('hex');
        const track = {id: id, title, albums, bands, duration, released, genres};
        tracks.push(track);
        return track;
    }

    @Mutation(returns => Track)
    async deleteTrack(@Args('id') id: string) {
        let deletedTrack;
        tracks = tracks.filter((track) => {
                if (track.id === id) {
                    deletedTrack = track;
                    return false;
                }

                return true;
            }
        )

        return deletedTrack;
    }

    @Mutation(returns => Track)
    async updateTrack(
        @Args({name: "id", type: () => ID}) id: string,
        @Args({name: 'title', type: () => String, nullable: true}) title: string,
        @Args({name: 'albums', type: () => [String], nullable: true}) albums: string[],
        @Args({name: 'bands', type: () => [String], nullable: true}) bands: string[],
        @Args({name: 'duration', type: () => Int, nullable: true}) duration: number,
        @Args({name: 'released', type: () => Int, nullable: true}) released: number,
        @Args({name: 'genres', type: () => [String], nullable: true}) genres: string[],
    ) {
        let updatedTrack;
        tracks.forEach((track) => {
            if (track.id === id) {
                track.title = title;
                track.albums = albums
                track.bands = bands;
                track.duration = duration
                track.released = released;
                track.genres = genres;

                updatedTrack = track;
            }
        });

        return updatedTrack;
    }
}
