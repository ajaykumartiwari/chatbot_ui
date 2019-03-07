import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Input} from "@angular/core";
import { Router } from "@angular/router";
import { ChatService } from "../chat.service";
import { LoginComponent } from "../login/login.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Content } from "@angular/compiler/src/render3/r3_ast";


@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnInit {

  @ViewChild('messageBox')  msgBox: ElementRef;
  @ViewChild('content')  modelContent: ElementRef;
  @Input() chatButton: boolean = false;
  req: string;
  response: string = "";
  innerHtml: string = "";
  chats: Chats[] = [];
  robot: string = 'BOTMAN';
  user: string = 'me';
  isDisabled: boolean = false;

  check: boolean = false

  closeResult: string;
  model: any = {};
  loading = false;
  returnUrl: string;

  
  //req: string;
  
  constructor(
    private router: Router,
    private chatService: ChatService,
    private loginComponent: LoginComponent,
    private modalService: NgbModal
  ) {
    this.pushToChat({message: "How may I help you...", type: "ROBO", date: new Date()})
   }

  ngOnInit() {
    this.setFocus();
  }

  onSubmit(): void {
    if(this.req !="") {
      this.userRequest();
    }
  }

  userRequest(): void{
    console.log("User Input :" + this.req);
    this.isDisabled = true;
    this.pushToChat(this.generateChat(this.req, 'USER'));
   
    this.chatService
    .sendData(this.req)
    .subscribe(data => {
      console.info(data);
      if(data) {
        if(data.message == "login"){
        alert("request data");
        this.check = true;
        this.open(this.modelContent);
        //this.loginComponent.open();
        }
        this.req = "";
        console.log("System output :");
        console.log(data);
        console.info(this.chats);
        this.pushToChat(this.generateChat(data.message, 'ROBO'));
        this.isDisabled = false;
        this.setFocus();
      }
    })
  }

  setFocus(): void {
    setTimeout(() => {
      this.msgBox.nativeElement.focus();
    });
  }

  pushToChat(chat: Chats): void {
    this.chats.push(chat);
  }

  generateChat(message: string, type: string): Chats {
    return {message: message, type: type, date: new Date()}
  }

  open(content) {
    console.log("----",);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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


//   login() {
//     this.loading = true;
//     this.authenticationService.login(this.model.id, this.model.name)
//         .subscribe(
//             data => {
//                 this.router.navigate([this.returnUrl]);
//             },
//             error => {
//                 this.alertService.error(error);
//                 this.loading = false;
//             });
// }


}

interface Chats {
  message: string;
  type: string;
  date: Date;
}


export interface Person {
  id:number;
  firstName: string;
  lastName: string;
}