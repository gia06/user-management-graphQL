import { CanActivate, Injectable, Logger } from "@nestjs/common";
import { UserService } from "../user.service";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private userService: UserService) {}
    
    async canActivate(context: any): Promise<boolean> {
        context.switchToHttp().getRequest();
        
        try {
            const  {token}  = context.getArgs()[1].deleteUserInput;
            Logger.log(token, 'token')

            const role = (await this.userService.decodeJwt(token)).user_role;
            console.log(role)

            if(role === 'admin') {
                return true
            }

        } catch (err) {
            Logger.log(err, 'Error')
            return false
        }
    }
}