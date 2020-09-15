import { DropDownComponent } from './shared/drop-down/drop-down.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatTabsModule } from '@angular/material/tabs';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccountsComponent } from './accounts/accounts.component';
import { ForgetComponent } from './forget/forget.component';
import { HttpClientModule , HttpClientJsonpModule  } from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxSpinnerService } from "ngx-spinner";
import { GreetingComponent } from './greeting/greeting.component';
import { DocumentUploadComponent } from './document-upload/document-upload.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { StorageModule } from '@ngx-pwa/local-storage';
import { ReactiveFormsModule  } from '@angular/forms';
import { SharedModule } from './shared/shared.module';






@NgModule({
  declarations: [
    AppComponent,
    DropDownComponent,
    AccountsComponent,
    ForgetComponent,
    GreetingComponent,
    DocumentUploadComponent,
    HomeComponent,
    DashboardComponent
  ],
  imports: [

    CommonModule,
    BrowserModule,
    AppRoutingModule,
    MatTabsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxSpinnerModule,
    FormsModule,
    HttpClientJsonpModule,
    ReactiveFormsModule,
    SharedModule,
    StorageModule.forRoot({ IDBNoWrap: true }),



  ],
  providers: [NgxSpinnerService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
