import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {CreateUserDto} from './dto/create-user.dto';
import {User} from './models/user.model';
import {createCipheriv, randomBytes, scrypt} from 'crypto';
import {promisify} from 'util';

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

    async findqwe(): Promise<any> {
        const iv = randomBytes(16);
        const password = 'Password used to generate key';
        const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
        const cipher = createCipheriv('aes-256-ctr', key, iv);

        const textToEncrypt = 'Yusuf';
        const encryptedText = Buffer.concat([
            cipher.update(textToEncrypt),
            cipher.final(),
        ]);
        return encryptedText
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

    // UploadRelations(id: string): Promise<User> {
    //     return this.userModel.findOne({
    //         where: {
    //             id,
    //         },
    //         include: [{
    //             association: 'Orders',
    //             include: [{
    //                 association: 'cart',
    //                 include: ['cartProducts']
    //             }]
    //         }]
    //     });
    // }
}
