import 'dotenv/config';
import { Plugin } from '@nestjs/apollo';
import {
  ApolloServerPlugin,
  GraphQLRequestContext,
  BaseContext,
  GraphQLRequest,
} from 'apollo-server-plugin-base';
import {
  HttpException,
  HttpStatus,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../modules/User/model/user.model.js';

@Plugin()
export class LoggedInPlugin implements ApolloServerPlugin {
  @Inject()
  private jwtService: JwtService;

  private loggedInMutationExceptions = ['register'];

  private canAccess(requestContext: GraphQLRequestContext<BaseContext>) {
    return this.loggedInMutationExceptions.some((method) =>
      requestContext.request.query.split('{')[1].trim().startsWith(method),
    );
  }

  private async validateToken(token: string): Promise<User> {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: process.env.SECRET,
      });
    } catch (err) {
      switch (err.message) {
        case 'invalid token':
        case 'jwt must be provided':
          throw new UnauthorizedException();
        default:
          throw new HttpException(
            err.message,
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
      }
    }
  }

  async requestDidStart(requestContext: GraphQLRequestContext<BaseContext>) {
    const request: GraphQLRequest = requestContext.request;
    if (
      request.query.startsWith('mutation') &&
      !this.canAccess(requestContext)
    ) {
      const headers = requestContext.context.req.headers;
      const token = headers['authorization'] || headers['Authorization'];
      await this.validateToken(token.split(' ')[1]);
    }
  }
}
