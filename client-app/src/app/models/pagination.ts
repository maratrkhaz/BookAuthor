export interface IPagination {
    curPage: number;
    itemsInPage: number;
    totalItems: number;
    totalPages: number;
}

export class PageResult<T> {
    data: T;
    pagination: IPagination;

    constructor (data: T, pagination: IPagination) {
        this.data = data;
        this.pagination = pagination
    }
}

export interface IPagingParams {
    pageNumber: number;
    pageSize: number;
}

export const PageParams = {
    pageNumber: 1,
    pageSize: 3
};

