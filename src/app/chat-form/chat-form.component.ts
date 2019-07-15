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
  @ViewChild('sfonds') sfondsAccountOptons: ElementRef

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
  showOptions: boolean = false;
  optionProductName: string;
  lastIndex: number = 0;

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
    this.pushToChat({ message: "How may I help you...", type: "ROBO", date: new Date() , showButtonOption: false})
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
    this.showOptions = false;
    console.log("User Input :" + this.req);
    this.isDisabled = true;
    this.pushToChat(this.generateChat(this.req, 'USER', false));
    this.chatService
      .sendData(this.req)
      .subscribe(data => {
        console.info(data);
        if (data) {
          if (data.message == "login modal" && this.count == 0) {
            this.open(this.modelContent);
          } else if (data.message == "update modal") {
            if (this.count == 0) {
              alert("User Not LogedIn ! Please Login First")
            } else {
              this.open(this.updateAddress)
            }
          } else if (this.count > 0) {
            alert("User Alresdy LogedIn")
          }
          if (this.req.includes("sfonds") && data.message != "hi") {
            
            this.showOptions = true;
            this.optionProductName = "sFonds";
            // this.open(this.sfondsAccountOptons)
          }
          if (this.req.includes("giro") && data.message != "") {
            this.showOptions = true;
            this.optionProductName = "Giro";
            // this.open(this.sfondsAccountOptons)
          }
          if (this.req.includes("student") && data.message != "") {
            this.showOptions = true;
            this.optionProductName = "Student";
            // this.open(this.sfondsAccountOptons)
          }
          this.req = "";
          console.log("System output :");
          console.log(data);
          console.info(this.chats);
          if(this.showOptions == true){
            this.pushToChat(this.generateChat(data.message, 'ROBO', true ));
          }
          else{
            this.pushToChat(this.generateChat(data.message, 'ROBO', false));
          }
          
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
    console.log(this.chats.length - 1)
    this.lastIndex = this.chats.length - 1;
    this.chats.push(chat);

  }

  generateChat(message: string, type: string, showButtonOption: boolean): Chats {
    return { message: message, type: type, date: new Date() , showButtonOption : showButtonOption }
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


  yesResponse() {
    //this.router.navigate(['https://www.sparkasse.at/erstebank-en/private-clients/accounts-cards'])
    window.open('https://shop.sparkasse.at/store/home?institute=198&productCode=CAPITALPLAN&channel=03&conditionGroup=SFONDSPLAN&language=AT&entityID=A5DAA8BA-D717-40B5-88ED-AF05F2BADF6D&nfxsid=')
  }
  noResponse() {
    this.showOptions = false;
  }
}


interface Chats {
  message: string;
  type: string;
  date: Date;
  showButtonOption: boolean;
}


export interface Person {
  id: number;
  firstName: string;
  lastName: string;
}