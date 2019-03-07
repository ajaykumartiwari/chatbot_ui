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
  
  enableEdit(){
    this.isDisabled = false;
  }
}
