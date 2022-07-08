import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Favourite, FavouriteDocument } from '../model/favourite.model.js';
import { Model } from 'mongoose';
import { Album } from '../../Album/model/album.model.js';
import { Artist, ArtistDocument } from '../../Artist/model/artist.model.js';
import { Band, BandDocument } from '../../Band/model/band.model.js';
import { Genre, GenreDocument } from '../../Genre/model/genre.model.js';
import { Track, TrackDocument } from '../../Track/model/track.model.js';

@Injectable()
export class FavouriteRepository {
  constructor(
    @InjectModel(Favourite.name)
    private favouriteModel: Model<FavouriteDocument>,
    @InjectModel(Band.name) private bandModel: Model<BandDocument>,
    @InjectModel(Genre.name) private genreModel: Model<GenreDocument>,
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    @InjectModel(Artist.name) private artistModel: Model<ArtistDocument>,
  ) {}

  async findOneByUserId(id: string): Promise<Favourite> {
    return this.favouriteModel.findOne({ userId: id }).exec();
  }

  async addTrackToFavourites(
    userId: string,
    trackId: string,
  ): Promise<Favourite> {
    return this.favouriteModel
      .findOneAndUpdate(
        { userId: userId },
        { $push: { tracks: trackId } },
        { new: true },
      )
      .exec();
  }

  async addBandToFavourites(
    userId: string,
    bandId: string,
  ): Promise<Favourite> {
    return this.favouriteModel
      .findOneAndUpdate(
        { userId: userId },
        { $push: { bands: bandId } },
        { new: true },
      )
      .exec();
  }

  async addArtistToFavourites(
    userId: string,
    artistId: string,
  ): Promise<Favourite> {
    return this.favouriteModel
      .findOneAndUpdate(
        { userId: userId },
        { $push: { artists: artistId } },
        { new: true },
      )
      .exec();
  }

  async addGenreToFavourites(
    userId: string,
    genreId: string,
  ): Promise<Favourite> {
    return this.favouriteModel
      .findOneAndUpdate(
        { userId: userId },
        { $push: { genres: genreId } },
        { new: true },
      )
      .exec();
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
