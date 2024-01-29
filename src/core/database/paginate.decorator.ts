import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const PaginateQuery = createParamDecorator((param: 'all', context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const {
        route: { path },
        query,
    } = request;

    const take: any = query.take ? parseInt(query.take) : null;
    const page: any = query.page ? parseInt(query.page) : null;
    const skip: any = query.skip ? parseInt(query.skip) : null;
    const sort: any = query.sort ? (query.sort) : null;


    const payload: { [key: string]: any } = {
        path: path,
        page,
        take,
        skip,
        showOffset: param === 'all' || false,
        filter: query.filter,
        sort
    };
    return payload;
});
