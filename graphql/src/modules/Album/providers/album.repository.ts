import { InjectModel } from '@nestjs/mongoose';
import { Album, AlbumDocument } from '../model/album.model.js';
import { Model } from 'mongoose';
import { Band, BandDocument } from '../../Band/model/band.model.js';
import { Genre, GenreDocument } from '../../Genre/model/genre.model.js';
import { Track, TrackDocument } from '../../Track/model/track.model.js';
import { Artist, ArtistDocument } from '../../Artist/model/artist.model.js';
import { AlbumDto } from '../dto/album.dto.js';

export class AlbumRepository {
  constructor(
    @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
    @InjectModel(Band.name) private bandModel: Model<BandDocument>,
    @InjectModel(Genre.name) private genreModel: Model<GenreDocument>,
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    @InjectModel(Artist.name) private artistModel: Model<ArtistDocument>,
  ) {}

  async findAll(): Promise<Album[]> {
    return this.albumModel.find().exec();
  }

  async findOneById(id: string): Promise<Album> {
    return this.albumModel.findById(id).exec();
  }

  async createAlbum(albumDto: AlbumDto): Promise<Album> {
    const createdAlbum = new this.albumModel(albumDto);
    return createdAlbum.save();
  }

  async deleteAlbum(id: string): Promise<Album> {
    return this.albumModel.findByIdAndDelete(id);
  }

  async updateAlbum(id: string, albumDto: AlbumDto): Promise<Album> {
    return this.albumModel.findByIdAndUpdate(id, albumDto);
  }

  async artists(album: Album): Promise<Artist[]> {
    const artistIds = album.artists;
    return this.artistModel.find({ _id: { $in: artistIds } }).exec();
  }

  async bands(album: Album): Promise<Band[]> {
    const bandIds = album.bands;
    return this.bandModel.find({ _id: { $in: bandIds } }).exec();
  }

  async genres(album: Album): Promise<Genre[]> {
    const genreIds = album.genres;
    return this.genreModel.find({ _id: { $in: genreIds } }).exec();
  }

  async tracks(album: Album): Promise<Track[]> {
    const trackIds = album.tracks;
    return this.trackModel.find({ _id: { $in: trackIds } }).exec();
  }
}
