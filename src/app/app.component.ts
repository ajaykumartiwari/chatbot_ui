import { Component, Output } from '@angular/core';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fe';

  isDisabled: boolean = true;
  start: string = "Chat";
  count: number = 0;

  enableEdit(){
    this.count++;
    this.start = "Close"
    if(this.count == 2){
      this.isDisabled = false;
      this.count = 0
      this.start = "Chat"
     }
     if( this.count == 1){
     this.start = "Close"
     this.isDisabled = true;
    }
  }
}
