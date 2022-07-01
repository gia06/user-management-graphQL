import { Resolver, Query, Args, Mutation, Context, Info, Parent } from '@nestjs/graphql';
import { CreateUserInput } from '../Common/dtos/input/create-users.args';
import { UpdateUserInput } from '../Common/dtos/input/update-user.imput';
import { GetUserArgs } from '../Common/dtos/args/get-user.args';
import { User } from '../Common/schema/user.schema';
import { UserService } from './user.service';
import { LoginInput } from '../Common/dtos/input/login.input';
import { Logger, Next } from '@nestjs/common';
import { LoginInterface } from 'src/Common/dtos/output/login.output';
import { UpvoteUserInput } from 'src/Common/dtos/input/upvote-user.input';
import { VoteInput } from 'src/Common/dtos/input/upvote.input';



@Resolver(() => User)
export class UserResolver {
constructor(private userService: UserService) {}

    @Query(() => User, {name: 'user', nullable: true})
    async getUser(@Args() getUserArg: GetUserArgs ) {
        return await this.userService.findOne(getUserArg.nickname)
    }

    @Query(() => [User], {name: 'users', nullable: true})
    async getUsers() {
        
        const users = await this.userService.findAll()
        Logger.log(users)
        return users 
    }

    @Mutation(() => User, {name: 'register', nullable: true})
    async createUser(@Args('createUserArgs') createUserInput: CreateUserInput) {
        return await this.userService.create(createUserInput)
    }
    
    @Mutation(() => User, {name: 'update', nullable: true})
    async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) { 
        return this.userService.update(updateUserInput.nickname, updateUserInput)
    }

    @Mutation(() => LoginInterface, {name: 'login', nullable: true})
    async login(@Args('loginInput') loginInput: LoginInput) {
        const {nickname, password} = loginInput
        return await this.userService.login(nickname, password)
    }

    @Mutation(() => User, {name: 'upvote', nullable: true})
    async upvote(@Args('upvoteInput') upvoteInput: VoteInput, @Context() context, @Info() info, @Parent() parent,) {
        const id = (await this.userService.decodeJwt(upvoteInput.token)).user_id
        return await this.userService.upvote(id, upvoteInput.nickname)
        console.log(parent)
    }

    @Mutation(() => User, {name: 'mid', nullable: true})
    async middle(@Args('args') args : VoteInput, @Next() next) {
        console.log(args)
    }
    
}
