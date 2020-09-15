import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { DocumentUploadComponent } from './document-upload/document-upload.component';
import { GreetingComponent } from './greeting/greeting.component';
import { ForgetComponent } from './forget/forget.component';
import { AccountsComponent } from './accounts/accounts.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  {
    path:"accounts",
    pathMatch: 'full',
    component:AccountsComponent
  }
  ,{
    path:"forget",
    component: ForgetComponent
  }
  ,{
    path :"greeting" ,
    component:GreetingComponent
  }
  ,
  {
    path : "document-upload",
    component: DocumentUploadComponent
  } ,
  {
    path: "home",
    component: HomeComponent
  } ,
  {
    path:"dashboard",
    component:DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
