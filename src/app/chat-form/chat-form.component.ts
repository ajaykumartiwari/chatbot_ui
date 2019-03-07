import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Input} from "@angular/core";
import { Router } from "@angular/router";
import { ChatService } from "../chat.service";
import { LoginComponent } from "../login/login.component";


@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnInit {

  @ViewChild('messageBox')  msgBox: ElementRef;
  @Input() chatButton: boolean = false;
  req: string;
  response: string = "";
  innerHtml: string = "";
  chats: Chats[] = [];
  robot: string = 'BOTMAN';
  user: string = 'me';
  isDisabled: boolean = false;
  
  constructor(
    private router: Router,
    private chatService: ChatService,
    private loginComponent: LoginComponent
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
        alert("request data")
        this.loginComponent.open();
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
}

interface Chats {
  message: string;
  type: string;
  date: Date;
}
