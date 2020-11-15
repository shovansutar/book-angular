import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Book } from './book';
import { Observable, of, pipe, throwError } from 'rxjs';
import { map, switchMap, debounceTime, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BookService {
  private CATEGORY_REST = "http://localhost:3300/api/category";
  private BOOK_REST = "http://localhost:3300/api/book";
  private BOOK_REST_BAD = "http://localhost:3300/api/buuk";
  private FILE_UPLOAD = "http://localhost:3300/api/upload";

  constructor(private httpClient: HttpClient) { }
  public getCategories() {
    return this.httpClient.get(this.CATEGORY_REST);
  }
  public getAllBooks() {
    return this.httpClient.get(this.BOOK_REST);
  }

  public uploadImage(file: File){
    const fd = new FormData();
    fd.append('file-to-upload', file, file.name);
    const http$ = this.httpClient.post(this.FILE_UPLOAD, fd);
    return http$;
  }

  public addBook(book: Book) {
    console.log("Service > AddBook: ", book);
    return this.httpClient.post(this.BOOK_REST, book);      
  }
  public deleteBook(bid){
    console.log("Service > DeleteBook: ", bid);
    return this.httpClient.delete(this.BOOK_REST + '/' + bid);      
  }
}

