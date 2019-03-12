import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Input } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ChatService } from "../chat.service";
import { LoginComponent } from "../login/login.component";
import { NgbModal, NgbPopover, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Content } from "@angular/compiler/src/render3/r3_ast";
import { FormBuilder, Validators } from "@angular/forms";
import { LoginServiceService } from "../services/login-service.service";
import { UpdateService } from "../services/update.service";
import { UpdateModel } from "../model/update.model";


@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnInit {

  @ViewChild('messageBox') msgBox: ElementRef;
  @ViewChild('content') modelContent: ElementRef;
  @ViewChild('data') modelDataContent: ElementRef;
  @ViewChild('update') updateAddress: ElementRef
  //@ViewChild('Save click') modal: ElementRef;
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

  check: boolean = true
  count: number = 0;

  closeResult: string;
  model: any = {};
  loading = false;
  returnUrl: string;
  errorMsg = '';
  userData: any;
  updateUser: any = {};
  responseData: any;

  //req: string;

  constructor(
    private router: Router,
    private chatService: ChatService,
    private loginComponent: LoginComponent,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private loginServiceService: LoginServiceService,
    private updateService: UpdateService,
    private route: ActivatedRoute,
    public activeModal: NgbActiveModal
  ) {
    this.pushToChat({ message: "How may I help you...", type: "ROBO", date: new Date() })
  }

  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  updateAddressData = this.formBuilder.group({
    userId: ['', Validators.required],
    name: ['', Validators.required],
    addressLine1: ['', Validators.required],
    addressLine2: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    zipcode: ['', Validators.required],
    country: ['', Validators.required]
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
          if (data.message == "login" && this.count == 0) {
            this.open(this.modelContent);
          } else if (data.message == "update") {
            if(this.count == 0){
              alert("User Not LogedIn ! Please Login First" )
            }else{
              this.open(this.updateAddress)
            }
          }else if(this.count > 0) {
            alert("User Alresdy LogedIn")
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
    console.log("----");
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    return null
  }

  login() {
    console.log(this.loginForm.value)
    this.loginServiceService.login(this.loginForm.value).subscribe(
      (response) => {
        console.log("success", response);
        this.userData = response;
        console.log("---", this.userData)
        // this.router.navigate(['/admindashboard']);
        this.loginForm.reset();
        if (this.userData != null) {
          this.open(this.modelDataContent);
          this.count++
          // alert(this.count > 0)
        }
      },
      (error) => {
        this.errorMsg = error.statusText
      }
    )
  }

  updateUserAddress(update: UpdateModel): void {
    // this.updateService.updateUser(update).subscribe(data => {
    //   //this.restaurants = this.restaurants.filter(update => update !== restaurant);
    //   alert("Restaurant Updated Successfully");
    // });
    console.log(this.updateAddressData.value)
    this.updateService.updateUser(this.updateAddressData.value).subscribe(
      (response) => {
        console.log("successfully update", response);
        this.responseData = response;

        console.log("---", this.responseData)
        // this.router.navigate(['/admindashboard']);
        this.updateAddressData.reset();
        // if (response != null) {
        //   this.open(this.modelDataContent);
        // }
      },
      (error) => {
        this.errorMsg = error.statusText
      }
    )
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