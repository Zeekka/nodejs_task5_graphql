import { Args, ID, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from './model/user.model.js';
import { users as ImpUsers} from '../temp_data_provider.js';
import * as crypto from 'crypto';

let users = ImpUsers;

@Resolver(of => User)
export class UserResolver {
    @Query(returns => User)
    async user(@Args('id') id: string) {
        return users.filter((user) => user.id === id).pop();
    }

    @Mutation(returns => User)
    async register(
        @Args({name: 'firstName', type: () => String, nullable: true}) firstName: string,
        @Args({name: 'secondName', type: () => String, nullable: true}) secondName: string,
        @Args({name: 'password', type: () => String}) password: string,
        @Args({name: 'email', type: () => String}) email: string,
    ) {
        const id = crypto.randomBytes(15).toString('hex');
        const user = {id, firstName, secondName, password, email};
        users.push(user);
        return user;
    }
}
