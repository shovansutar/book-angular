import { Component, OnInit } from '@angular/core';
import {BookService} from '../book.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private bookService: BookService) { }
  opened = false;
  categories = [];
  ngOnInit(): void {
    this.bookService.getCategories().subscribe((data:any[])=>{
      console.log(data);
      this.categories = data;
    });
  }


}
