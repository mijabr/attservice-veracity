import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { NgGridModule } from 'angular2-grid';
import { FileDropModule } from 'angular2-file-drop';
import { VeracityComponent } from './veracity.component';
import { ViewModelComponent } from './component/viewmodel.component';
import { AuthService } from './service/auth.service'
import { AttacheApiService } from './service/attacheapi.service';
import './svg/ic_receipt_black_24px.svg';

@NgModule({
  imports: [
      BrowserModule,
      FormsModule,
      HttpModule,
      MaterialModule.forRoot(),
      NgGridModule,
      FileDropModule
    ],
  declarations: [
      VeracityComponent,
      ViewModelComponent
    ],
  providers:[
      AuthService,
      AttacheApiService
  ],
  bootstrap: [ VeracityComponent ]
})
export class VeracityModule { }
