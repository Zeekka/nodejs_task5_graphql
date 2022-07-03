import { Args, ID, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import * as crypto from 'crypto';
import {
    genres as ImpGenres,
    albums as ImpAlbums,
    artists as ImpArtists,
    bands as ImpBands
} from '../temp_data_provider.js';
import { Album } from './model/album.model.js';
import { Artist } from '../Artist/model/artist.model.js';
import { Band } from '../Band/model/band.model.js';
import { Genre } from '../Genre/model/genre.model.js';

let genres = ImpGenres;
let albums = ImpAlbums;
let artists = ImpArtists;
let bands = ImpBands;

@Resolver(of => Album)
export class AlbumResolver {
    @Query(returns => Album)
    async album(@Args('id') id: string) {
        return albums.filter((album) => album.id === id).pop();
    }

    @Query(returns => [Album])
    async albums() {
        return albums;
    }

    @ResolveField('artists', type => [Artist])
    async artists(@Parent() album: Album) {
        return album.artists.map(artistId => {
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
    async bands(@Parent() album: Album) {
        return album.bands.map(bandId => {
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
    async genres(@Parent() album: Album) {
        return album.genres.map(genreId => {
            let genreObj;
            genres.forEach(genre => {
                if (genre.id === genreId) {
                    genreObj = genre;
                }
            });

            return genreObj;
        });
    }

    @Mutation(returns => Album)
    async createAlbum(
        @Args({name: 'name', type: () => String, nullable: true}) name: string,
        @Args({name: 'released', type: () => Int, nullable: true}) released: number,
        @Args({name: 'artists', type: () => [String], nullable: true}) artists: string[],
        @Args({name: 'bands', type: () => [String], nullable: true}) bands: string[],
        @Args({name: 'genres', type: () => [String], nullable: true}) genres: string[],
        // @Args({name: 'tracks', type: () => [String], nullable: true}) tracks: string[],
        @Args({name: 'image', type: () => String, nullable: true}) image: string,
    ) {
        const id = crypto.randomBytes(15).toString('hex');
        const album = {id: id, name, released, artists, bands, genres, image};
        albums.push(album);
        return album;
    }

    @Mutation(returns => Album)
    async deleteAlbum(@Args('id') id: string) {
        let deletedAlbum;
        albums = albums.filter((album) => {
                if (album.id === id) {
                    deletedAlbum = album;
                    return false;
                }

                return true;
            }
        )

        return deletedAlbum;
    }

    @Mutation(returns => Album)
    async updateAlbum(
        @Args({name: "id", type: () => ID}) id: string,
        @Args({name: 'name', type: () => String, nullable: true}) name: string,
        @Args({name: 'released', type: () => Int, nullable: true}) released: number,
        @Args({name: 'artists', type: () => [String], nullable: true}) artists: string[],
        @Args({name: 'bands', type: () => [String], nullable: true}) bands: string[],
        @Args({name: 'genres', type: () => [String], nullable: true}) genres: string[],
        // @Args({name: 'tracks', type: () => [String], nullable: true}) tracks: string[],
        @Args({name: 'image', type: () => String, nullable: true}) image: string,
    ) {
        let updatedAlbum;
        albums.forEach((album) => {
            if (album.id === id) {
                album.name = name;
                album.released = released;
                album.artists = artists;
                album.bands = bands;
                album.genres = genres;
                album.image = image;

                updatedAlbum = album;
            }
        });

        return updatedAlbum;
    }
}
