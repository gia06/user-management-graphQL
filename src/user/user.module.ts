import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HashModule } from '../hash/hash.module';
import { User, UserSchema } from '../Common/schema/user.schema';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { UserResolver } from './user.resolver';

@Module({
  imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}]), HashModule, JwtModule],
  providers: [UserService, UserResolver],
})
export class UserModule {}
