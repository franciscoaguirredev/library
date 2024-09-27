import { Injectable } from "@nestjs/common";
import { title } from "process";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('books')
export class Book {
    
    @PrimaryGeneratedColumn('increment')
    id: string

    @Column('varchar', {length:255, nullable:false, name: 'title'})
    title:string

    @Column('varchar', {length:255, nullable:false, name: 'author'})
    author: string

     @Column('varchar', {length:255, nullable:false, name: 'genre'})
    genre: string

    @Column({name: 'datePublication', type:'timestamptz', nullable:false})
    datePublication: string

}
