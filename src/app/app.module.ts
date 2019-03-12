import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatIconModule, MatButtonModule } from '@angular/material';
import { AppComponent } from './app.component';
import { ChatFormComponent } from './chat-form/chat-form.component';
import { AppRoutingModule } from './/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatService } from './chat.service';
import {HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductsComponent } from './products/products.component';
import { MatCardModule } from '@angular/material';
import { SwiperModule } from 'ngx-useful-swiper';
import { LoginComponent } from './login/login.component';
import {NgbModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { LoginServiceService } from './services/login-service.service';
import { UpdateService } from './services/update.service';
@NgModule({
  declarations: [
    AppComponent,
    ChatFormComponent,
    ProductsComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    SwiperModule,
    NgbModule,
    ReactiveFormsModule,
    
  ],
  providers: [ChatService, LoginComponent,LoginServiceService,NgbActiveModal,UpdateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
