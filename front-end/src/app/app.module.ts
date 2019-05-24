import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {MzInputModule, MzSelectModule, MzToastModule} from 'ngx-materialize';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { UsersComponent } from './users/users.component';
import { HobbiesComponent } from './hobbies/hobbies.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    HobbiesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MzInputModule,
    MzSelectModule,
    MzToastModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
