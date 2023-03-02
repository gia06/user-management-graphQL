import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../Common/schema/user.schema';
import { Model } from 'mongoose';
import { HashService } from '../hash/hash.service';
import { JwtService } from '@nestjs/jwt';

import { JwtPayloadInterface } from '../Common/interface/jwt.interface';
import { CreateUserInput } from 'src/Common/dtos/input/create-users.args';
import 'dotenv/config';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private hashService: HashService,
    private jwtService: JwtService,
  ) {}

  async findOne(nickname: string) {
    return await this.userModel.findOne({ nickname });
  }

  async findOneFiltered(nickname: string) {
    return await this.userModel
      .findOne({ nickname })
      .select('nickname firstname lastname votes');
  }

  async findAll() {
    return await this.userModel
      .find()
      .select('nickname firstname lastname votes role');
  }

  async create(user: CreateUserInput) {
    const { hash, salt } = await this.hashService.hashPassword(user.password);
    const newUser = new this.userModel({
      nickname: user.nickname,
      firstname: user.firstname,
      lastname: user.lastname,
      password: hash,
      salt: salt,
    });

    return newUser.save();
  }

  async delete(nickname: string) {
    await this.userModel.findOneAndUpdate({ nickname }, { deleted: true });
    return {message: 'user deleted'};
  }

  async update(nickname: string, toUpdate) {
    await this.userModel.findOneAndUpdate(
      { nickname, deleted: false },
      toUpdate,
    );
    return this.userModel.findOne({ nickname });
  }

  async jwtAuth(user) {
    const payload = {
      user_id: user._id,
      user_role: user.role,
    };

    return {
      token: this.jwtService.sign(payload, { secret: process.env.JWT_KEY }),
    };
  }

  async decodeJwt(jwt: string) {
    const decoded = this.jwtService.decode(jwt) as JwtPayloadInterface;
    return decoded;
  }

  async upvote(id: string, nickname: string): Promise<User> {
    const user = await this.userModel.findOne({
      id: { $ne: id },
      nickname: nickname,
      deleted: false,
    });
    Logger.log(user, 'user');

    const upvoters = user.upvotedBy;
    const downvoters = user.downvotedBy.filter((element) => element !== id);

    upvoters.push(id);
    const updatedUser = await this.update(nickname, {
      upvotedBy: upvoters,
      downvotedBy: downvoters,
      votes: user.votes + 1,
    });

    return updatedUser;
  }

  async downvote(id: string, nickname: string): Promise<User> {
    const user = await this.userModel.findOne({
      id: { $ne: id },
      nickname: nickname,
      deleted: false,
    });
    Logger.log(user.downvotedBy);

    const downVoters = user.downvotedBy;
    downVoters.push(id.toString());
    Logger.log(downVoters);
    const upVoters = user.upvotedBy.filter((element) => element !== id);

    const updatedUser = await this.update(nickname, {
      upvotedBy: upVoters,
      downvotedBy: downVoters,
      votes: user.votes - 1,
    });

    return updatedUser;
  }

  async login(loginNickname: string, loginPassword: string) {
    try {
      const user = await this.findOne(loginNickname);
      const { password, salt } = user; // stored salt and password

      const newHash = (
        await this.hashService.hashWithProvidedSalt(loginPassword, salt)
      ).hash;

      if (password === newHash) {
        const token = await (await this.jwtAuth(user)).token;
        Logger.log(token, 'token');
        return {
          message: 'login sucessfull',
          token,
        };
      }
    } catch (err) {
      Logger.log(err);
      return new BadRequestException('nickname or password is incorrect');
    }
  }
}
