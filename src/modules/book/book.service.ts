import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { handleResponse, handleError } from '../common/utils/response.util'
import { error } from 'console';
import { FilterBookDto } from './dto/filter-book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>
  ){}

  async create(createBook: CreateBookDto):Promise<any> {  
    try {
      const newBook = await this.bookRepository.save(createBook)
      return handleResponse(newBook, 'Book created successfully', HttpStatus.CREATED);
    } catch (error) {
      handleError(error, 'Failed to retrieve books');
    }
  }

async findWithFilter(query:FilterBookDto) {
  let { size, page } = query;
  const skippedItems = (page - 1) * size;
  try {
    const allBooks = await this.bookRepository
    .createQueryBuilder('book')
    .skip(skippedItems)
    .take(size);
    
    if (!allBooks) {
      throw new NotFoundException('Books not found');
    }
    
    return handleResponse(allBooks, 'Books found successfully', HttpStatus.OK);
  } catch (error) {
    if (error instanceof NotFoundException) {
      throw error;
    }
    handleError(error, 'Failed to find books');
  }
}

  private async findAllBooks(){
    return await this.bookRepository.find()
  }

  async findOne(bookId: string) {
    try {
      const bookFound = await this.bookRepository.findOneBy({id:bookId})

      if(!bookFound) throw new NotFoundException(`Book with id: ${bookId} not found`)
    
      return  handleResponse(bookFound, 'Book found successfully', HttpStatus.OK)
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      handleError(error, 'Failed to find book');
    }
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }

}

