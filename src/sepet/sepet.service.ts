import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateSepetDto } from './dto/create-sepet.dto';
import { Sepet } from './models/sepet.model';

@Injectable()
export class SepetService {
    constructor(
        @InjectModel(Sepet)
        private readonly sepetModel: typeof Sepet,
    ) {}

    create(createSepetDto: CreateSepetDto): Promise<Sepet> {
        return this.sepetModel.create({
            urunAdi: createSepetDto.urunAdi,
            urunFiyat: createSepetDto.urunFiyat,
            urunId: createSepetDto.urunId,
        });
    }

    async findAll(): Promise<Sepet[]> {
        return this.sepetModel.findAll();
    }

    findOne(id: string): Promise<Sepet> {
        return this.sepetModel.findOne({
            where: {
                id,
            },
            include: ['urunler']
        });
    }

    async remove(id: string): Promise<void> {
        const sepet = await this.findOne(id);
        await sepet.destroy();
    }
}
