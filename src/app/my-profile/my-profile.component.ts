import { Component, OnInit } from '@angular/core';
import {BookService} from '../book.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  profile = {email: "", name:"", phone:"" };
  
  constructor(
    private bookService: BookService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.bookService.getMyProfile().subscribe(
      (p:any) => {
        this.profile = p;
        console.log(this.profile);
      },
      err => {
        console.log(err)
        this.router.navigate(['home/login']);
      }
    );
  }
}
