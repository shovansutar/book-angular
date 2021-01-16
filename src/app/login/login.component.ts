import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { BookService } from '../book.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData = { email:"", password:""}

  constructor(private bookService: BookService,
              private _router: Router) { }

  ngOnInit() {
  }

  loginUser() {
    console.log(this.loginUserData)
    this.bookService.loginUser(this.loginUserData)
      .subscribe(
        res => {
          console.log('Login Success', res);
          localStorage.setItem('token', res.token)
          localStorage.setItem('username', res.name)
          localStorage.setItem('userid', res.userid)
          this._router.navigate(['/home/search'])
        },
        err => console.log(err)
      )
  }

}
