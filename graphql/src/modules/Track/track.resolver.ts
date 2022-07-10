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
import { Track, TrackDocument } from './model/track.model.js';
import { Band } from '../Band/model/band.model.js';
import { Genre } from '../Genre/model/genre.model.js';
import { Album } from '../Album/model/album.model.js';
import { TracksRepository } from './providers/tracks.repository.js';
import { TrackDto } from './dto/track.dto.js';

@Resolver((of) => Track)
export class TrackResolver {
  constructor(private tracksRepository: TracksRepository) {}

  @Query((returns) => Track)
  async track(@Args('id') id: string) {
    return this.tracksRepository.findOneById(id);
  }

  @Query((returns) => [Track])
  async tracks() {
    return this.tracksRepository.findAll();
  }

  @ResolveField()
  async id(@Parent() track: TrackDocument): Promise<string> {
    return track._id.toString();
  }

  @ResolveField('albums', (type) => [Album])
  async artists(@Parent() track: Track) {
    return this.tracksRepository.albums(track);
  }

  @ResolveField('bands', (type) => [Band])
  async bands(@Parent() track: Track) {
    return this.tracksRepository.bands(track);
  }

  @ResolveField('genres', (type) => [Genre])
  async genres(@Parent() track: Track) {
    return this.tracksRepository.genres(track);
  }

  @Mutation((returns) => Track)
  async createTrack(
    @Args({ name: 'title', type: () => String, nullable: true }) title: string,
    @Args({ name: 'albums', type: () => [String], nullable: true })
    albums: string[],
    @Args({ name: 'bands', type: () => [String], nullable: true })
    bands: string[],
    @Args({ name: 'duration', type: () => Int, nullable: true })
    duration: number,
    @Args({ name: 'released', type: () => Int, nullable: true })
    released: number,
    @Args({ name: 'genres', type: () => [String], nullable: true })
    genres: string[],
  ) {
    const trackDto = new TrackDto();
    trackDto.title = title;
    trackDto.albums = albums;
    trackDto.bands = bands;
    trackDto.duration = duration;
    trackDto.released = released;
    trackDto.genres = genres;

    return this.tracksRepository.createTrack(trackDto);
  }

  @Mutation((returns) => Track)
  async deleteTrack(@Args('id') id: string) {
    return this.tracksRepository.deleteTrack(id);
  }

  @Mutation((returns) => Track)
  async updateTrack(
    @Args({ name: 'id', type: () => ID }) id: string,
    @Args({ name: 'title', type: () => String, nullable: true }) title: string,
    @Args({ name: 'albums', type: () => [String], nullable: true })
    albums: string[],
    @Args({ name: 'bands', type: () => [String], nullable: true })
    bands: string[],
    @Args({ name: 'duration', type: () => Int, nullable: true })
    duration: number,
    @Args({ name: 'released', type: () => Int, nullable: true })
    released: number,
    @Args({ name: 'genres', type: () => [String], nullable: true })
    genres: string[],
  ) {
    const trackDto = new TrackDto();
    trackDto.title = title;
    trackDto.albums = albums;
    trackDto.bands = bands;
    trackDto.duration = duration;
    trackDto.released = released;
    trackDto.genres = genres;

    return this.tracksRepository.updateTrack(id, trackDto);
  }
}
