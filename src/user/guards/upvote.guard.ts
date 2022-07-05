import { Injectable, CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import { UserService } from '../user.service';

@Injectable()
export class UpvoteGuard implements CanActivate {
    constructor (private userService: UserService) {}

  async canActivate(
    context: ExecutionContext,
  ):  Promise<boolean>  {
    context.switchToHttp().getRequest();

    try {
      const {token, nickname} = context.getArgs()[1].upvoteInput

      Logger.log(context.getArgs()[1].upvoteInput.token, 'args');

      const {upvotedBy} = (await this.userService.findOne(nickname));
      const id = (await this.userService.decodeJwt(token)).user_id

      if(!upvotedBy.includes(id)) {
          return true
      }

    } catch (err) {
      Logger.log(err, 'Error')
      return false
    }
  }
}
