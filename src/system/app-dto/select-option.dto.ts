export class SelectOptionDto {
    join?: JoinOptionDto[];
    field?: string;
    where?: string;
    page?: string = '1';
    limit?: string = '10';
    sort?: string;
    groupBy?: string;
}

export class JoinOptionDto {
    leftJoin ?: [string|Function, string];
    innerJoin?: [string|Function, string];
}