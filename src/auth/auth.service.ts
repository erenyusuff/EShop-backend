import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from '../users/users.service';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {
    }

    async signIn(userName, pass) {
        const user = await this.usersService.findOneByUserName(userName);
        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }
        const payload = {sub: user.id, userName: user.userName};
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}