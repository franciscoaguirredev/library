import { IsString, IsNotEmpty, IsDate, IsOptional, IsInt } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class FilterBookDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Transform(({ value }) => value ?? 1)
    page?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Transform(({ value }) => value ?? 10)
    size?: number;

    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    autor?: string;

    @IsOptional()
    @IsString()
    genre?: string;

    @IsOptional()
    @IsDate()
    @Transform(({ value }) => new Date(value))
    datePublication?: string;
}
