import {Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards} from '@nestjs/common';
import {AuthGuard} from './auth.guard';
import {AuthService} from './auth.service';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {Public} from "../../core/decorators/public.decorator";
import {User} from "../users/models/user.model";
import {UsersService} from "../users/users.service";
import {Roles} from "../roles/roles.guard";
import {Role} from "../../shared/enum/role";


@Controller('auth')
@Roles.Params(true)
export class AuthController {

    constructor
    (private authService: AuthService, private readonly usersService: UsersService) {
    }


    @HttpCode(HttpStatus.OK)
    @Public()
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) {
        return this.authService.signIn(signInDto.userName, signInDto.password);
    }

    @HttpCode(HttpStatus.CREATED)
    @Public()
    @Roles.Params(Role.USER)
    @Post('register')
    async register(@Body() model: CreateUserDto): Promise<User> {
        return this.usersService.register(model);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}