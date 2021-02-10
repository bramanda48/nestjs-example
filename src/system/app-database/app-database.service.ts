import { Injectable, NotFoundException } from '@nestjs/common';
import { JoinOptionDto, ResponseDto, ResponsePagingDto, SelectOptionDto } from '@system/dto';
import { exception } from 'console';
import { EntityManager, EntityRepository, EntityTarget, ObjectLiteral, SelectQueryBuilder } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
@EntityRepository()
export class AppDatabaseService {
    constructor(
        private readonly manager: EntityManager,
    ) {}

    async show<T>(entity: EntityTarget<T>, options?: SelectOptionDto, parameter?: ObjectLiteral): Promise<ResponseDto> {
        let result: ResponseDto = new ResponseDto();
        let resultPaging: ResponsePagingDto = new ResponsePagingDto();
        let builder: SelectQueryBuilder<T> = this.manager.createQueryBuilder(entity, 'a');
        
        if(this.empty(options)) {
            options = new SelectOptionDto();
        }

        //Set default limit & page
        let limit: number = options.limit ? parseInt(options.limit): 10;
        let page : number = 1;
        if(this.isNumber(options.page) && options.page !== 'x') {
            page = parseInt(options.page);
        }

        //Set all option to builder
        if(options.field) {
            builder = builder.select(options.field);
        }
        if(options.where) {
            builder = builder.where(options.where, parameter);
        }
        if(options.sort && options.sort.length > 0) {
            options.sort.match(/([\w\+]+\s{1}(?:ASC|DESC|asc|desc))/g).forEach((value) => {
                const [sort, order] = value.split(' ');
                const mapOrder: Record<string, 'ASC'|'DESC'> = {
                    'asc' : 'ASC',
                    'ASC' : 'ASC',
                    'desc': 'DESC',
                    'DESC': 'DESC',
                }
                builder = builder.orderBy(sort, mapOrder[order]);
            });
        }
        if(options.groupBy) {
            builder = builder.groupBy(options.groupBy);
        }
        if(options.join && options.join.length > 0) {
            options.join.forEach((value: JoinOptionDto, index) => {
                index++;

                if(value.innerJoin) {
                    const [table, term] = value.innerJoin;
                    builder = builder.innerJoin(table, String.fromCharCode(97 + index), term);
                }
                if(value.leftJoin) {
                    const [table, term] = value.leftJoin;
                    builder = builder.leftJoin(table, String.fromCharCode(97 + index), term);
                }
            });
        }       

        //Paging offset
        if(options.page !== 'x') {
            let position: number = (page - 1) * limit;
            builder = builder.limit(limit);  
            builder = builder.offset(position)
        } else {
            if(options.limit) {
                builder = builder.limit(limit);  
            }
        }
        
        //Execute query
        let output  = (options.field) ? await builder.getRawMany(): await builder.getMany();
        if(output.length <= 0) {
            result.success = false;
            result.message = 'Data not found';
            result.statusCode = 404;
            return result;
        }
        result.data = output;

        //Execute query paging
        if(options.page !== 'x') {
            let jumlah = await builder.getCount();
            resultPaging.isNext = (jumlah > (limit * page));
            resultPaging.isPrev = (page > 1); 
            resultPaging.page   = page;
            resultPaging.count  = output.length;
            resultPaging.total  = jumlah;
            result.paging = resultPaging;
        }  
        return result;
    }

    async insert<T>(entity: EntityTarget<T>, values: QueryDeepPartialEntity<T> | QueryDeepPartialEntity<T>[]): Promise<ResponseDto> {
        let result: ResponseDto = new ResponseDto();
        let builder: SelectQueryBuilder<T> = this.manager.createQueryBuilder();

        //Save the data
        let output = await builder
                        .insert()
                        .into(entity)
                        .values(values)
                        .execute();
        result.message = 'Data saved successfully.';
        result.data = output.raw;

        return result;
    }

    async update<T>(entity: EntityTarget<T>, values: QueryDeepPartialEntity<T>, where: string, parameter?: ObjectLiteral): Promise<ResponseDto> {
        let result: ResponseDto = new ResponseDto();
        let builder: SelectQueryBuilder<T> = this.manager.createQueryBuilder();

        //Save the data
        let output = await builder
                        .update(entity)
                        .set(values)
                        .where(where, parameter)
                        .execute();
        
        if(output.raw['affectedRows'] <= 0) {
            throw new NotFoundException('Data not found.');
        }
        result.message = 'Data saved successfully.';
        result.data = output.raw;

        return result;
    }

    async delete<T>(entity: EntityTarget<T>, where: string, parameter?: ObjectLiteral): Promise<ResponseDto> {
        let result: ResponseDto = new ResponseDto();
        let builder: SelectQueryBuilder<T> = this.manager.createQueryBuilder();

        //Save the data
        let output = await builder
                        .delete()
                        .from(entity)
                        .where(where, parameter)
                        .execute();
        
        if(output.raw['affectedRows'] <= 0) {
            throw new NotFoundException('Data not found.');
        }
        result.message = 'Data deleted successfully.';
        result.data = output.raw;

        return result;
    }

    empty(string): boolean {
        return (string == undefined || string == "" || string == null || string.length == 0);
    }

    isNumber(string): boolean {
        return new RegExp(/([0-9]+)/g).test(string);
    }
}