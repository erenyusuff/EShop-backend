import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {JwtModule} from '@nestjs/jwt';
import {AuthController} from './auth.controller';
import {jwtConstants} from './constants';
import {UsersModule} from "../users/users.module";

@Module({
    imports: [
        UsersModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: {expiresIn: '600000h'},
        }),
    ],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {
}