import { Args, ID, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import * as crypto from 'crypto';
import { genres as ImpGenres } from '../temp_data_provider.js';
import { Genre } from './model/genre.model.js';

let genres = ImpGenres;

@Resolver(of => Genre)
export class GenreResolver {
    @Query(returns => Genre)
    async genre(@Args('id') id: string) {
        return genres.filter((genre) => genre.id === id).pop();
    }

    @Query(returns => [Genre])
    async genres() {
        return genres;
    }

    @Mutation(returns => Genre)
    async createGenre(
        @Args({name: 'name', type: () => String, nullable: true}) name: string,
        @Args({name: 'description', type: () => String, nullable: true}) description: string,
        @Args({name: 'country', type: () => String, nullable: true}) country: string,
        @Args({name: 'year', type: () => Int, nullable: true}) year: number
    ) {
        const id = crypto.randomBytes(15).toString('hex');
        const genre = {id: id, name, description, country, year};
        genres.push(genre);
        return genre;
    }

    @Mutation(returns => Genre)
    async deleteGenre(@Args('id') id: string) {
        let deletedGenre;
        genres = genres.filter((genre) => {
                if (genre.id === id) {
                    deletedGenre = genre;
                    return false;
                }

                return true;
            }
        )

        return deletedGenre;
    }

    @Mutation(returns => Genre)
    async updateGenre(
        @Args({name: 'id', type: () => ID}) id: string,
        @Args({name: 'name', type: () => String, nullable: true}) name: string,
        @Args({name: 'description', type: () => String, nullable: true}) description: string,
        @Args({name: 'country', type: () => String, nullable: true}) country: string,
        @Args({name: 'year', type: () => Int, nullable: true}) year: number
    ) {
        let updatedGenre;
        genres.forEach((genre) => {
            if (genre.id === id) {
                genre.name = name;
                genre.description = description;
                genre.country = country;
                genre.year = year;

                updatedGenre = genre;
            }
        });

        return updatedGenre;
    }
}
