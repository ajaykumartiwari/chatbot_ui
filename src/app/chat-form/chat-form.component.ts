import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Input } from "@angular/core";
import { Router } from "@angular/router";
import { ChatService } from "../chat.service";
import { LoginComponent } from "../login/login.component";
import { NgbModal, NgbPopover } from "@ng-bootstrap/ng-bootstrap";
import { Content } from "@angular/compiler/src/render3/r3_ast";
import { FormBuilder } from "@angular/forms";
import { LoginServiceService } from "../services/login-service.service";


@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnInit {

  @ViewChild('messageBox') msgBox: ElementRef;
  @ViewChild('content') modelContent: ElementRef;
  @ViewChild('div') public popover: NgbPopover;

 // @Output() closeModalEvent = new EventEmitter<boolean>();
 @ViewChild('completeModal') completeModal: ElementRef;

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
  errorMsg = ''


  //req: string;

  constructor(
    private router: Router,
    private chatService: ChatService,
    private loginComponent: LoginComponent,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private loginServiceService: LoginServiceService,
  ) {
    this.pushToChat({ message: "How may I help you...", type: "ROBO", date: new Date() })
  }

  loginForm = this.formBuilder.group({
    username: [],
    password: ['']

  });
  ngOnInit() {
    this.setFocus();
  }

  onSubmit(): void {
    if (this.req != "") {
      this.userRequest();
    }
  }

  userRequest(): void {
    console.log("User Input :" + this.req);
    this.isDisabled = true;
    this.pushToChat(this.generateChat(this.req, 'USER'));

    this.chatService
      .sendData(this.req)
      .subscribe(data => {
        console.info(data);
        if (data) {
          if (data.message == "login") {
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
    return { message: message, type: type, date: new Date() }
  }

  open(content) {
    this.check = true;
    console.log("----");
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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

  login() {
    console.log(this.loginForm.value)
    this.loginServiceService.login(this.loginForm.value).subscribe(
      (response) => {
        console.log("success", response);
        // this.router.navigate(['/admindashboard']);
        
      },
      (error) => {
        this.errorMsg = error.statusText
      }
    )
  }

  onClick() {
    this.check = false
    this.popover.close();
  }
}

interface Chats {
  message: string;
  type: string;
  date: Date;
}


export interface Person {
  id: number;
  firstName: string;
  lastName: string;
}