import { Args, ID, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Band } from './model/band.model.js';
import * as crypto from 'crypto';
import { Artist } from '../Artist/model/artist.model.js';
import {bands as ImpBands, artists as ImpArtist} from '../temp_data_provider.js';

let bands = ImpBands;
let artists = ImpArtist;


@Resolver(of => Band)
export class BandResolver {
    @Query(returns => Band)
    async band(@Args('id') id: string) {
        return bands.filter((band) => band.id === id).pop();
    }

    @Query(returns => [Band])
    async bands() {
        return bands;
    }

    @ResolveField('members', returns => [Artist])
    async members(@Parent() band: Band) {
        return band.members;
    }

    @Mutation(returns => Band)
    async createBand(
        @Args({name: 'name', type: () => String, nullable: true}) name: string,
        @Args({name: 'origin', type: () => String, nullable: true}) origin: string,
        @Args({name: 'members', type: () => [String], nullable: true}) members: string[],
        @Args({name: 'website', type: () => String, nullable: true}) website: string,
        // @Args({name: 'genres', type: () => [Genre], nullable: true}) genres: Genre[],
    ) {
        const id = crypto.randomBytes(15).toString('hex');
        const membersArray: Artist[] = members.map(memberId => {
            return artists.filter(artist => artist.id === memberId).pop();
        });
        const band = {id: id, name, origin, members: membersArray, website};
        bands.push(band);
        return band;
    }

    @Mutation(returns => Band)
    async deleteBand(@Args('id') id: string) {
        let deletedBand;
        bands = bands.filter((band) => {
                if (band.id === id) {
                    deletedBand = band;
                    return false;
                }

                return true;
            }
        )

        return deletedBand;
    }

    @Mutation(returns => Band)
    async updateBand(
        @Args({name: 'id', type: () => ID}) id: string,
        @Args({name: 'name', type: () => String, nullable: true}) name: string,
        @Args({name: 'origin', type: () => String, nullable: true}) origin: string,
        @Args({name: 'members', type: () => [String], nullable: true}) members: string[],
        @Args({name: 'website', type: () => String, nullable: true}) website: string,
        // @Args({name: 'genres', type: () => [Genre], nullable: true}) genres: Genre[],
    ) {
        let updatedBand;
        bands.forEach((band) => {
            if (band.id === id) {
                band.name = name;
                band.origin = origin;
                band.members = members.map(memberId => {
                    return artists.filter(artist => artist.id === memberId).pop();
                });
                band.website = website;

                updatedBand = band;
            }
        });

        return updatedBand;
    }
}