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
  pattern = '';
  
  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe((data:any[])=>{
      console.log(data);
      this.books = data;
    });
  }
  deleteBook(b){
    let bid = b._id;
    console.log("Delete Book: ", bid);
    this.bookService.deleteBook(bid).subscribe(
      data => {}, 
      err => console.log('DELETE-HTTP Error', err),
      () => {
        console.log('DELETE-HTTP request completed.')
        // cleanup local array
        let index = this.books.indexOf(b);
        this.books.splice(index, 1);
      }
    );
  }
  searchPattern(){
    console.log("Searching: ", this.pattern);
    this.bookService.getByPattern(this.pattern).subscribe((data:any[])=>{
      // console.log(data);
      this.books = data;
    });
  }
}
