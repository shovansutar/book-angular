import { Component, OnInit } from '@angular/core';
import {BookService} from '../book.service'

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  constructor(private bookService: BookService) { }
  books = [];
  
  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe((data:any[])=>{
      console.log(data);
      this.books = data;
    });
  }
  deleteBook(bid){
    console.log("Delete Book: ", bid);
    this.bookService.deleteBook(bid).subscribe(
      err => console.log('DELETE-HTTP Error', err),
      () => console.log('DELETE-HTTP request completed.')
    );
  }
}
