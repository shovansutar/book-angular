import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerUserData = { email: "", password: "", name: "", phone: "" }
  constructor(
    private bookService: BookService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  registerUser() {
    console.log(this.registerUserData);
    this.bookService.registerUser(this.registerUserData)
      .subscribe(
        res => {
          localStorage.setItem('token', res.token)
          localStorage.setItem('username', res.name)
          localStorage.setItem('userid', res.userid)
          this.router.navigate(['/home/search'])
        },
        err => console.log(err)
      )
  }
}
