import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { BookService } from '../book.service';
import { RestResponse } from '../rest-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  constructor(
    private bookService: BookService,
    private router: Router
  ) { }
  selectedFile: File = null;
  bookModel = new Book('', '', '', '', '', '', '', '', '', new Date(), '', '');
  categories = [];
  ngOnInit(): void {
    this.bookService.getCategories().subscribe((data:any[])=>{
      this.categories = data;
    });
  }
  onFileSelected(event) {
    console.log(event);
    this.selectedFile = <File>event.target.files[0];
  }
  handleSubmit() {
    console.log('submit called.');
    const http$ = this.bookService.uploadImage(this.selectedFile);
    http$.subscribe((res: RestResponse) => {
      console.log('File name: ', res.file);
      // console.log(res);
      this.bookModel.image1 = res.file;
      const child$ = this.bookService.addBook(this.bookModel);
      child$.subscribe((cres: RestResponse) => {
        console.log('CHILD-HTTP response', cres);
      },
        cerr => console.log('CHILD-HTTP Error', cerr),
        () => {
          console.log('CHILD-HTTP request completed.');
          this.router.navigateByUrl("home/search");
        }
      );

    },
      err => console.log('MAIN-HTTP Error', err),
      () => console.log('MAIN-HTTP request completed.')
    );
  }
}
