import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from '../users/users.service';
import {JwtService} from '@nestjs/jwt';
import {compare} from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {
    }

    async signIn(userName, pass) {
        const user = await this.usersService.findOneByUserName(userName);
        const isMatch = await compare(pass, user.password);
        if (!isMatch)
            if (compare(user?.password !== pass)) {
                throw new UnauthorizedException();
            }
        const payload = {userId: user.id, userName: user.userName, eMail: user.email, password: user.password};
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}

