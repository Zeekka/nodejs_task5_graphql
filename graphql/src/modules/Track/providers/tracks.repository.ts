import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Track, TrackDocument } from '../model/track.model.js';
import { Injectable } from '@nestjs/common';
import { Genre, GenreDocument } from '../../Genre/model/genre.model.js';
import { Band, BandDocument } from '../../Band/model/band.model.js';
import { TrackDto } from '../dto/track.dto.js';
import { Album, AlbumDocument } from '../../Album/model/album.model.js';

@Injectable()
export class TracksRepository {
  constructor(
    @InjectModel(Track.name) private tracksModel: Model<TrackDocument>,
    @InjectModel(Genre.name) private genresModel: Model<GenreDocument>,
    @InjectModel(Band.name) private bandsModel: Model<BandDocument>,
    @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
  ) {}

  async findAll(): Promise<Track[]> {
    return this.tracksModel.find().exec();
  }

  async findOneById(id: string): Promise<Track> {
    return this.tracksModel.findById(id).exec();
  }

  async createTrack(trackDto: TrackDto): Promise<Track> {
    const createdTrack = new this.tracksModel(trackDto);
    return createdTrack.save();
  }

  async deleteTrack(id: string): Promise<Track> {
    return this.tracksModel.findByIdAndDelete(id).exec();
  }

  async updateTrack(id: string, trackDto: TrackDto): Promise<Track> {
    return this.tracksModel.findByIdAndUpdate(id, trackDto).exec();
  }

  async albums(track: Track): Promise<Album[]> {
    const albumsIds = track.albums;
    return this.albumModel.find({ _id: { $in: albumsIds } }).exec();
  }

  async bands(track: Track): Promise<Band[]> {
    const bandsIds = track.bands;
    return this.bandsModel.find({ _id: { $in: bandsIds } }).exec();
  }

  async genres(track: Track): Promise<Genre[]> {
    const genreIds = track.genres;
    return this.genresModel.find({ _id: { $in: genreIds } }).exec();
  }
}
