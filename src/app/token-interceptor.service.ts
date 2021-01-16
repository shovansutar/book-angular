import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor() { }
  intercept(req, next) {
    // let authService = this.injector.get(AuthService)
    let token = localStorage.getItem('token');
    let tokenizedReq = req.clone(
      {
        headers: req.headers.set('Authorization', `Bearer ${token}`)
        // headers: req.headers.set('Authorization', 'bearer ' + authService.getToken())
      }
    )
    return next.handle(tokenizedReq)
  }
}
