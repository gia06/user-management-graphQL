import { CanActivate, ExecutionContext, Injectable, Logger } from "@nestjs/common";
import { UserService } from "../user.service";

@Injectable()
export class DownvoteGuard implements CanActivate {
  constructor (private userService: UserService) {}

  async canActivate(
    context: ExecutionContext,
  ):  Promise<boolean>  {
    context.switchToHttp().getRequest();

    try {
        const {token, nickname} = context.getArgs()[1].downvoteInput
        Logger.log(context.getArgs()[1].downvoteInput.token, 'args');

        const {downvotedBy} = (await this.userService.findOne(nickname));
        const id = (await this.userService.decodeJwt(token)).user_id

        if(!downvotedBy.includes(id)) {
            return true
        } 

    } catch (err) {
        Logger.log(err, 'Error')
        return false
    }
  }
}