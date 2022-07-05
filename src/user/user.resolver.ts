import {
  Resolver,
  Query,
  Args,
  Mutation,
} from '@nestjs/graphql';
import { CreateUserInput } from '../Common/dtos/input/create-users.args';
import { UpdateUserInput } from '../Common/dtos/input/update-user.imput';
import { GetUserArgs } from '../Common/dtos/args/get-user.args';
import { User } from '../Common/schema/user.schema';
import { UserService } from './user.service';
import { LoginInput } from '../Common/dtos/input/login.input';
import { Logger, UseGuards } from '@nestjs/common';
import { LoginOutput } from 'src/Common/dtos/output/login.output';
import { VoteInput } from 'src/Common/dtos/input/upvote.input';
import { UpvoteGuard } from './guards/upvote.guard';
import { DownvoteGuard } from './guards/downvote.guard';
import { AuthGuard } from './guards/auth.guard';
import { GetUsersArgs } from 'src/Common/dtos/args/get-users.ags';
import { RoleGuard } from './guards/role.guard';
import { DeleteInput } from '../Common/dtos/input/delete.input';
import { DeleteOutput } from 'src/Common/dtos/output/delete.output';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  @Query(() => User, { name: 'user', nullable: true })
  async getUser(@Args() getUserArg: GetUserArgs) {
    return await this.userService.findOne(getUserArg.nickname);
  }

  @UseGuards(AuthGuard)
  @Query(() => [User], { name: 'users', nullable: true })
  async getUsers(@Args() getUserArgs: GetUsersArgs) {
    console.log(getUserArgs);
    const users = await this.userService.findAll();
    Logger.log(users);
    return users;
  }

  @Mutation(() => User, { name: 'register', nullable: true })
  async createUser(@Args('createUserArgs') createUserInput: CreateUserInput) {
    return await this.userService.create(createUserInput);
  }

  @UseGuards(RoleGuard)
  @Mutation(() => User, { name: 'update', nullable: true })
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.nickname, updateUserInput);
  }

  @Mutation(() => LoginOutput, { name: 'login', nullable: true })
  async login(@Args('loginInput') loginInput: LoginInput) {
    const { nickname, password } = loginInput;
    return await this.userService.login(nickname, password);
  }

  @UseGuards(UpvoteGuard)
  @Mutation(() => User, { name: 'upvote', nullable: true })
  async upvote(@Args('upvoteInput') upvoteInput: VoteInput) {
    const id = (await this.userService.decodeJwt(upvoteInput.token)).user_id;
    return await this.userService.upvote(id, upvoteInput.nickname);
  }

  @UseGuards(DownvoteGuard)
  @Mutation(() => User, { name: 'downvote', nullable: true })
  async downvote(@Args('downvoteInput') downvoteInput: VoteInput) {
    const id = (await this.userService.decodeJwt(downvoteInput.token)).user_id;
    return await this.userService.downvote(id, downvoteInput.nickname);
  }

  @UseGuards(RoleGuard)
  @Mutation(() => DeleteOutput, { name: 'delete', nullable: true })
  async delete(@Args('deleteUserInput') deleteUserInput: DeleteInput) {
    return await this.userService.delete(deleteUserInput.nickname);
  }
}
