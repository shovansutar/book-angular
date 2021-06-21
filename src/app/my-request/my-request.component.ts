import { Component, OnInit } from '@angular/core';
import {BookService} from '../book.service'

@Component({
  selector: 'app-my-request',
  templateUrl: './my-request.component.html',
  styleUrls: ['./my-request.component.css']
})
export class MyRequestComponent implements OnInit {

  constructor(private bookService: BookService) { }
  submitted = [];
  pending = [];
  
  ngOnInit(): void {
    console.log("OnInit called...")
    this.bookService.getSubmittedReqs().subscribe((subreqs:any[])=>{
      this.submitted = subreqs;
    });
    this.bookService.getMyPendingReqs().subscribe((preqs:any[])=>{
      this.pending = preqs;
    });
  }

  approve(sr){
    console.log('Approving req:', sr); 
    this.bookService.getMyProfile().subscribe(
      (p:any) => {
        let ownerContact:String = p.name + ', Phone: ' + p.phone + ', email: ' + p.email;
        sr.ownerContact = ownerContact;
        sr.status = 'Approved';
        sr.approved = new Date();
        // update the request
        this.bookService.updateRequest(sr).subscribe(
          data => {},
          err => {
            console.log(err)
          }
        )
      },
      err2 => {
        console.log(err2)
      }
    )
  }
}
