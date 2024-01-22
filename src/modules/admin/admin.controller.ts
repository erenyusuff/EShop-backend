import {Controller, Get, Request} from '@nestjs/common';
import {UsersService} from "../users/users.service";

@Controller('admin')
export class AdminController {
    constructor(private readonly userService: UsersService) {
    }
    @Get('kontrol')
    adminKontrol(@Request() req) {
    this.userService.adminKontrol(req)
    }
}
