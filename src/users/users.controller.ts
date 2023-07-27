import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {User} from './models/user.model';
import {UsersService} from './users.service';
import {Public} from "../auth/decorators/public.decorator";

@Controller('users')

export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @Public()
    @Post()
    async create(@Body() model: CreateUserDto): Promise<User> {
        return this.usersService.register(model);
    }

    @Get()
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<User> {
        return this.usersService.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.usersService.remove(id);
    }
}
