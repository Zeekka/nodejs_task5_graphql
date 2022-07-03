import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Artist } from './model/artist.model.js';
import * as crypto from 'crypto';
import {bands as ImpBands, artists as ImpArtist} from '../temp_data_provider.js';

let bands = ImpBands;
let artists = ImpArtist;

@Resolver(of => Artist)
export class ArtistResolver {
    @Query(returns => Artist)
    async artist(@Args('id') id: string) {
        return artists.filter((artist) => artist.id === id).pop();
    }

    @Query(returns => [Artist])
    async artists() {
        return artists;
    }

    @Mutation(returns => Artist)
    async createArtist(
        @Args({name: 'firstName', type: () => String, nullable: true}) firstName: string,
        @Args({name: 'secondName', type: () => String, nullable: true}) secondName: string,
        @Args({name: 'middleName', type: () => String, nullable: true}) middleName: string,
        @Args({name: 'birthDate', type: () => String, nullable: true}) birthDate: string,
        @Args({name: 'birthPlace', type: () => String, nullable: true}) birthPlace: string,
        @Args({name: 'country', type: () => String, nullable: true}) country: string,
        // @Args({name: 'bands', type: () => [String], nullable: true}) bands: string[],
        @Args({name: 'instruments', type: () => [String], nullable: true}) instruments: string[],
    ) {
        const id = crypto.randomBytes(15).toString('hex');
        const artist = {id: id, firstName, secondName, middleName, birthDate, birthPlace, country, instruments};
        artists.push(artist);
        return artist
    }

    @Mutation(returns => Artist)
    async deleteArtist(@Args('id') id: string) {
        let deletedArtist;
        artists = artists.filter((artist) => {
                if (artist.id === id) {
                    deletedArtist = artist;
                    return false;
                }

                return true;
            }
        )

        return deletedArtist;
    }

    @Mutation(returns => Artist)
    async updateArtist(
        @Args({name: 'id', type: () => ID}) id: string,
        @Args({name: 'firstName', type: () => String, nullable: true}) firstName: string,
        @Args({name: 'secondName', type: () => String, nullable: true}) secondName: string,
        @Args({name: 'middleName', type: () => String, nullable: true}) middleName: string,
        @Args({name: 'birthDate', type: () => String, nullable: true}) birthDate: string,
        @Args({name: 'birthPlace', type: () => String, nullable: true}) birthPlace: string,
        @Args({name: 'country', type: () => String, nullable: true}) country: string,
        // @Args({name: 'bands', type: () => [String], nullable: true}) bands: string[],
        @Args({name: 'instruments', type: () => [String], nullable: true}) instruments: string[],
    ) {
        let updatedArtist;
        artists.forEach((artist) => {
            if (artist.id === id) {
                artist.firstName = firstName;
                artist.secondName = secondName;
                artist.middleName = middleName;
                artist.birthDate = birthDate;
                artist.country = country;
                artist.instruments = instruments;

                updatedArtist = artist;
            }
        });

        return updatedArtist;
    }
}