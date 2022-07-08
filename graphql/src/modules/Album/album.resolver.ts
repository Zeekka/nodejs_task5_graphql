import {
  Args,
  ID,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Album, AlbumDocument } from './model/album.model.js';
import { Artist } from '../Artist/model/artist.model.js';
import { Band } from '../Band/model/band.model.js';
import { Genre } from '../Genre/model/genre.model.js';
import { Track } from '../Track/model/track.model.js';
import { AlbumRepository } from './providers/album.repository.js';
import { AlbumDto } from './dto/album.dto.js';

@Resolver((of) => Album)
export class AlbumResolver {
  constructor(private albumRepository: AlbumRepository) {}

  @Query((returns) => Album)
  async album(@Args('id') id: string) {
    return this.albumRepository.findOneById(id);
  }

  @Query((returns) => [Album])
  async albums() {
    return this.albumRepository.findAll();
  }

  @ResolveField()
  async id(@Parent() album: AlbumDocument) {
    return album._id.toString();
  }

  @ResolveField('artists', (type) => [Artist])
  async artists(@Parent() album: Album) {
    return this.albumRepository.artists(album);
  }

  @ResolveField('bands', (type) => [Band])
  async bands(@Parent() album: Album) {
    return this.albumRepository.bands(album);
  }

  @ResolveField('genres', (type) => [Genre])
  async genres(@Parent() album: Album) {
    return this.albumRepository.genres(album);
  }

  @ResolveField('tracks', (type) => [Track])
  async tracks(@Parent() album: Album) {
    return this.albumRepository.tracks(album);
  }

  @Mutation((returns) => Album)
  async createAlbum(
    @Args({ name: 'name', type: () => String, nullable: true }) name: string,
    @Args({ name: 'released', type: () => Int, nullable: true })
    released: number,
    @Args({ name: 'artists', type: () => [String], nullable: true })
    artists: string[],
    @Args({ name: 'bands', type: () => [String], nullable: true })
    bands: string[],
    @Args({ name: 'genres', type: () => [String], nullable: true })
    genres: string[],
    @Args({ name: 'tracks', type: () => [String], nullable: true })
    tracks: string[],
    @Args({ name: 'image', type: () => String, nullable: true }) image: string,
  ) {
    const albumDto = new AlbumDto();
    albumDto.name = name;
    albumDto.artists = artists;
    albumDto.bands = bands;
    albumDto.genres = genres;
    albumDto.tracks = tracks;
    albumDto.image = image;

    return this.albumRepository.createAlbum(albumDto);
  }

  @Mutation((returns) => Album)
  async deleteAlbum(@Args('id') id: string) {
    return this.albumRepository.deleteAlbum(id);
  }

  @Mutation((returns) => Album)
  async updateAlbum(
    @Args({ name: 'id', type: () => ID }) id: string,
    @Args({ name: 'name', type: () => String, nullable: true }) name: string,
    @Args({ name: 'released', type: () => Int, nullable: true })
    released: number,
    @Args({ name: 'artists', type: () => [String], nullable: true })
    artists: string[],
    @Args({ name: 'bands', type: () => [String], nullable: true })
    bands: string[],
    @Args({ name: 'genres', type: () => [String], nullable: true })
    genres: string[],
    @Args({ name: 'tracks', type: () => [String], nullable: true })
    tracks: string[],
    @Args({ name: 'image', type: () => String, nullable: true }) image: string,
  ) {
    const albumDto = new AlbumDto();
    albumDto.name = name;
    albumDto.artists = artists;
    albumDto.bands = bands;
    albumDto.genres = genres;
    albumDto.tracks = tracks;
    albumDto.image = image;

    return this.albumRepository.updateAlbum(id, albumDto);
  }
}
