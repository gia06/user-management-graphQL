import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { HashModule } from './hash/hash.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import 'dotenv/config';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.URI),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: true,
      driver: ApolloDriver,
    }),
    UserModule,
    HashModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
