import {Injectable} from '@nestjs/common';
import {PaginateOptions} from "./paginate.intercase";

@Injectable()
export class PaginationService {
    static options = {
        defaultPage: 1,
        defaultLimit: 10,
    }

    private static include = [];

    static async findAllPaginate(options: PaginateOptions): Promise<any> {

        const take = options.take || this.options.defaultLimit;
        const page = options.page || this.options.defaultPage || 1;
        const offset = options.skip || ((page * take) - take);
        const include = options.include || ''
        this.include = [];



        if( include != '') {
            console.log(include)
            const result = await options.model.findAll({
                limit: take,
                offset: offset,
                include: include
            });
            const totalCount = await options.model.count({
                ...(this.include ? {include: this.include} : {})
            });

            const sort = await options.sort

            const totalPages = Math.ceil(totalCount / take);
            const data: any[] = result;

            const meta = {
                page,
                take,
                totalCount: totalCount,
                totalPages: totalPages,
            };

            return {
                data,
                totalCount,
                meta,
            };
        }

else {
            const result = await options.model.findAll({
                limit: take,
                offset: offset,
            });
            const totalCount = await options.model.count({
                ...(this.include ? {include: this.include} : {})
            });
            const totalPages = Math.ceil(totalCount / take);
            const data: any[] = result;

            const meta = {
                page,
                take,
                totalCount: totalCount,
                totalPages: totalPages,
            };

            return {
                data,
                totalCount,
                meta,
            };
        }
        // const totalCount = await options.model.count({
        //     ...(this.include ? {include: this.include} : {})
        // });
        // const totalPages = Math.ceil(totalCount / take);
        // const data: any[] = result;
        //
        // const meta = {
        //     page,
        //     take,
        //     totalCount: totalCount,
        //     totalPages: totalPages,
        // };
        //
        // return {
        //     data,
        //     totalCount,
        //     meta,
        // };
    }
}

