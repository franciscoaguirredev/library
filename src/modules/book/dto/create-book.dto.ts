import { IsString, IsNotEmpty, IsDate } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateBookDto {

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    author: string;

    @IsString()
    @IsNotEmpty()
    genre: string;

    @IsDate()
    @IsNotEmpty()
    @Transform(({ value }) => new Date(value))
    datePublication: string;
}
