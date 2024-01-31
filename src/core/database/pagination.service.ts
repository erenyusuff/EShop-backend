import {Injectable} from '@nestjs/common';
import {PaginateOptions} from "./paginate.intercase";
import {FindAndCountOptions} from "@sequelize/core";

@Injectable()
export class PaginationService {
    static options = {
        defaultPage: 1,
        defaultLimit: 10,
    }

    private static include = [];

    static async findAllPaginate(options: PaginateOptions,optionsSequelize: FindAndCountOptions = {}): Promise<any> {

        const take = options.take || this.options.defaultLimit;
        const page = options.page || this.options.defaultPage || 1;
        const offset = options.skip || ((page * take) - take);
        const include = options.include || ''
        this.include = [];

        if (!optionsSequelize.order) {
            if (options.sort) {
                const sortInfo = JSON.parse(options.sort);
                if (Array.isArray(sortInfo)) {
                    optionsSequelize.order = sortInfo.map(sortItem => {
                        const field = sortItem.selector;
                        const sortDirection = sortItem.desc ? 'DESC' : 'ASC';
                        return [field, sortDirection];
                    });
                } else if (sortInfo && sortInfo.selector) {
                    const field = sortInfo.selector;
                    const sortDirection = sortInfo.desc ? 'DESC' : 'ASC';
                    optionsSequelize.order = [[field, sortDirection]];
                }
            }
        }

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

