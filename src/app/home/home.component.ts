import { Component, OnInit } from '@angular/core';
import {BookService} from '../book.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private bookService: BookService, 
    private router: Router
  ) { }
  opened = false;
  svc = this.bookService;
  categories = [];
  lc = localStorage;

  ngOnInit(): void {
    this.bookService.getCategories().subscribe((data:any[])=>{
      console.log(data);
      this.categories = data;
    },
    err=>{
      this.router.navigate(['home/login']);
    });
  }

  logout(){
    this.bookService.logout();
  }
}
