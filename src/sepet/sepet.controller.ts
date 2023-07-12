import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Sepet } from 'src/sepet/models/sepet.model';
import { SepetService } from 'src/sepet/sepet.service';
import {CreateSepetDto} from "./dto/create-sepet.dto";

@Controller('Sepet')
export class SepetController {
    constructor(private readonly sepetService: SepetService) {}

    @Post()
    create(@Body() createSepetDto: CreateSepetDto): Promise<Sepet> {
        return this.sepetService.create(createSepetDto);
    }

    @Get()
    findAll(): Promise<Sepet[]> {
        return this.sepetService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Sepet> {
        return this.sepetService.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.sepetService.remove(id);
    }
}
