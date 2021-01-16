import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { BookService } from './book.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private router: Router, 
    private bookService: BookService
  ){}

  canActivate(): boolean {
    if(this.bookService.loggedIn()){
      return true;
    } else {
      this.router.navigate(['/home/login']);
      return false;
    }
  }  
}
