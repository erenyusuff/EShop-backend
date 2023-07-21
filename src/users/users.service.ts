import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {CreateUserDto} from './dto/create-user.dto';
import {User} from './models/user.model';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User)
        private readonly userModel: typeof User,
    ) {
    }

    register(createUserDto: CreateUserDto): Promise<User> {
        return this.userModel.create({
            userName: createUserDto.userName,
            firstName: createUserDto.firstName,
            lastName: createUserDto.lastName,
            email: createUserDto.email,
            birthday: createUserDto.birthday,
            memberGsmNumber: createUserDto.memberGsmNumber,
            password: createUserDto.password
        });
    }

    async findAll(): Promise<User[]> {
        return this.userModel.findAll();
    }

    findOne(id: string): Promise<User> {
        return this.userModel.findOne({
            where: {
                id,
            },
            include: ['Orders']
        });
    }

    async remove(id: string): Promise<void> {
        const user = await this.findOne(id);
        await user.destroy();

        console.log(user.toJSON())
    }

    async findOneByUserName(userName: string): Promise<User | undefined> {
        return this.userModel.findOne({
            where: {
                userName,
            }
        });
    }
}
