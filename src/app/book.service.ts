import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Book } from './book';
import { Observable, of, pipe, throwError } from 'rxjs';
import { map, switchMap, debounceTime, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BookService {
  private CATEGORY_REST   = "http://localhost:3300/api/category";
  private BOOK_REST       = "http://localhost:3300/api/book";
  private BOOK_SEARCH     = "http://localhost:3300/api/bookSearch";
  private FILE_UPLOAD     = "http://localhost:3300/api/upload";
  private REGISTER        = "http://localhost:3300/api/register";
  private LOGIN           = "http://localhost:3300/api/login";
  private MY_SUBMITTED    = "http://localhost:3300/api/myrequests";
  private MY_PENDING      = "http://localhost:3300/api/pendingreqs";
  private REQUEST         = "http://localhost:3300/api/request";
  private MYPROFILE       = "http://localhost:3300/api/myprofile";
  

  constructor(private httpClient: HttpClient) { }
  public getCategories() {
    return this.httpClient.get(this.CATEGORY_REST);
  }
  public getAllBooks() {
    return this.httpClient.get(this.BOOK_REST);
  }
  
  public getByPattern(pattern: string) {
    // console.log("pattern = ", pattern, typeof pattern, pattern.length);
    if (pattern == '') {
      // console.log("Found null param");
      return this.httpClient.get(this.BOOK_REST);
    } else {
      return this.httpClient.get(this.BOOK_SEARCH + '/' + pattern);
    }
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

  public registerUser(user){
    console.log("Service > RegisterUser: ", user);
    return this.httpClient.post<any>(this.REGISTER, user);  
  }

  public loginUser(user){
    console.log("Service > LoginUser: ", user);
    return this.httpClient.post<any>(this.LOGIN, user);  
  }
  public loggedIn(){
    return !! localStorage.getItem('token');
  }
  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userid');
  }
  public getSubmittedReqs() {
    return this.httpClient.get(this.MY_SUBMITTED);
  }
  public getMyPendingReqs() {
    return this.httpClient.get(this.MY_PENDING);
  }
  public addBookRequest(r) {
    console.log("Service > AddRequest: ", r);
    return this.httpClient.post(this.REQUEST, r);      
  }
  public getMyProfile() {
    return this.httpClient.get(this.MYPROFILE);
  }
  public updateRequest(sr){
    return this.httpClient.put<any>(this.REQUEST + '/' + sr._id, sr);  
  }  
}

