import { CanActivate, ExecutionContext, Injectable, Logger } from "@nestjs/common";
import { UserService } from "../user.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor (private userService: UserService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        context.switchToHttp().getRequest();
        try {
            const {token} = context.getArgs()[1]
            const id = (await this.userService.decodeJwt(token)).user_id
            Logger.log(token, 'token')
            
            if(id) {
                return true
            }

        } catch(err) {
            Logger.log(err, 'Error')
            return false
        }
    }
}