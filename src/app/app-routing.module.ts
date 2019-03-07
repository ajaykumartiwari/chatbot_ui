import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatFormComponent } from './chat-form/chat-form.component'

const routes: Routes = [
  {path:'req', component: ChatFormComponent},
  {path: 'user', component: ChatFormComponent},
  {path:'**', redirectTo: ''}
]
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule {}