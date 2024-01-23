import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {CreateUserDto} from './dto/create-user.dto';
import {User} from './models/user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User)
        private readonly userModel: typeof User,
    ) {
    }

    async register(createUserDto: CreateUserDto): Promise<User> {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);

        return this.userModel.create({
            userName: createUserDto.userName,
            firstName: createUserDto.firstName,
            lastName: createUserDto.lastName,
            email: createUserDto.email,
            birthday: createUserDto.birthday,
            gender: createUserDto.gender,
            memberGsmNumber: createUserDto.memberGsmNumber,
            password: hashedPassword,
            role: "user"
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
            include: [{
                association: 'Orders',
                include: [{
                    association: 'cart',
                    include: ['cartProducts']
                }]
            }]

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

    async adminKontrol(req): Promise<any> {
        const role = req.user.role
        if (role == "admin") {
            console.log('sucsessfull')
            console.log(role)
            return
        } else {
            console.log('hata')
            console.log(role)
            // throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }
    }

}
