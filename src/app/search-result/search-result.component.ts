import { Component, OnInit } from '@angular/core';
import {BookService} from '../book.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  constructor(
    private bookService: BookService,
    private router: Router
  ) { }
  books = [];
  pattern = '';
  ls = localStorage;

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
  request(b){
    let newr:any = {
      bookId: b._id, 
      bookName : b.title, 
      requesterId: this.ls.userid,
      ownerId: b.ownerId,
      message: 'TBD',
      status: 'New'
    };
    this.bookService.getMyProfile().subscribe(
      (p:any) => {
        newr.requesterContact = p.name + ', Phone: ' + p.phone + ', email: ' + p.email;
        this.bookService.addBookRequest(newr)
        .subscribe(
          res => {},
          err => {
            console.log(err)
            this.router.navigate(['home/login']);
          }
        )  
      },
      err => {
        console.log(err)
        this.router.navigate(['home/login']);
      }
    )
  }
}
