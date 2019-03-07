import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ChatService } from '../chat.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  closeResult: string;
  req: string;

  constructor(private modalService: NgbModal,private chatService: ChatService) {}

  open() {
    console.log("----",);
    this.modalService.open( {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    // if (reason === ModalDismissReasons.ESC) {
    //   return 'by pressing ESC';
    // } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    //   return 'by clicking on a backdrop';
    // } else {
    //   return  `with: ${reason}`;
    // }
    return null
  }

  userLoginresponse(): void{
    this.chatService
    .sendData(this.req)
    .subscribe(data => {
      console.info("Account data",data);
      if(data) {
        this.req = data;
        alert("request data")
      }
    })
  }
  ngOnInit() {
  }

}
