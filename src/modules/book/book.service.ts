import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { handleResponse, handleError } from '../common/utils/response.util'
import { error } from 'console';
import { FilterBookDto } from './dto/filter-book.dto';
import { loadBooks } from '../common/utils/load-books-default';

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

  async findAll(){
    const bookData = await this.bookRepository.find()
    return  handleResponse(bookData,  `Books loaded successfully, Total Books: ${bookData.length}`, HttpStatus.OK)
  }

  async findWithFilter(query:FilterBookDto) {
    let { size, page } = query;
    const skippedItems = (page - 1) * size;
    try {
      const filter = await this.bookRepository
      .createQueryBuilder('book')
      .skip(skippedItems)
      .take(size);

      this.buildFilterQuery(query, filter)

      const [data, totalItems] = await filter.getManyAndCount();

      let items = data.map((book) => book);
      return {
        items,
        meta: {
          totalItems,
          itemCount: data.length,
          itemsPerPage: size,
          totalPages: Math.ceil(totalItems / size),
          currentPage: page,
        }
      }
      
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      handleError(error, 'Failed to find books');
    }
  }

  private buildFilterQuery(
      query: FilterBookDto,
      filter: SelectQueryBuilder<Book>
    ) {
      let{
        title,
        author,
        genre,
        datePublication
      } = query

      if(title){
        filter.andWhere('book.title ILIKE :bookTitle', {bookTitle: `%${title}%`})
      }

      if(author){
        filter.andWhere('book.author ILIKE :bookauthor', {bookauthor: `%${author}%`})
      }

      if(genre){
        filter.andWhere('book.genre ILIKE :bookGenre', {bookGenre: `%${genre}%`})
        console.log(genre)
      }

      if(datePublication){
        filter.andWhere('book.datePublication ILIKE :bookDatePublication', {bookDatePublication: `%${datePublication}%`})
      }

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

  async loadBooksDefault(){

    for (const bookData of loadBooks) {
      const book ={
      title: bookData.title,
      author: bookData.author,
      genre: bookData.genre,
      datePublication: bookData.datePublication,
      };
      const findbook = await this.bookRepository.findBy({
        title: book.title,
        author: book.author,
        genre: book.genre,
        datePublication: book.datePublication
      })
      if(findbook.length > 0){ continue}
      await this.bookRepository.save(book);
    }
  } 


}

