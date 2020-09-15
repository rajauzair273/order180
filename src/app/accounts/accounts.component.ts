import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import{HttpReqService} from '../api/http-req.service';
import { LocalStorage } from '@ngx-pwa/local-storage';



@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
login_d:any ={
  email: "",
  password : ""
}
sign_up:any = {
first_name : "",
last_name : "" ,
bd : "",
email : "",
password : "",
c_password:""
}
  constructor(
public route: Router ,
public spinner : NgxSpinnerService ,
public api : HttpReqService ,
public storage : LocalStorage,

  ) {

  }

  ngOnInit() {


  }
  forget(){
   // this.api.swal_top("success" , "done" , 1500);

       this.route.navigate(['forget']);
  }
  login(){
    if(this.login_d.email == ""){
      this.api.swal_top("error" , "Email is required" , "1000");
      return;
    }
    if(this.login_d.password == ""){
      this.api.swal_top("error" , "Password is required" , "1000");
      return;
    }
    this.spinner.show();

    this.api.login(this.login_d).subscribe((res:any)=>{
      this.spinner.hide();
      if(res.result){
        this.api.swal_top("success" , res.msg , 2000);
        this.storage.setItem("user" , res.user).subscribe((res)=>{
          this.route.navigateByUrl("greeting");
        })
      }
      else{
        this.api.swal_top("error" , res.msg , 2000);
      }

    })
  }
  signup(){

    if(this.sign_up.first_name == ""){
      this.api.swal_top("error" , "First Name is Required" , "1000");
      return;
    }
    if(this.sign_up.last_name == ""){
      this.api.swal_top("error" , "Last Name is Required" , "1000");
      return;
    }
    if(this.sign_up.bd == ""){
      this.api.swal_top("error" , "Birth day  is Required" , "1000");
      return;
    }
    if(this.sign_up.email == ""){
      this.api.swal_top("error" , "Email is Required" , "1000");
      return;
    }
    if(this.sign_up.password == ""){
      this.api.swal_top("error" , "Password is Required" , "1000");
      return;
    }
    if(this.sign_up.c_password == ""){
      this.api.swal_top("error" , "Confirm password is Required" , "1000");
      return;
    }
    if(this.sign_up.password == ""){
      this.api.swal_top("error" , "First Name is Required" , "1000");
      return;
    }
    if(!String(this.sign_up.email).includes("@")){
      this.api.swal_top("error" , "Please Enter Valid Email" , "1000");
      return;
    }
    if(this.sign_up.password != this.sign_up.c_password){
      this.api.swal_top("error" , "Password not match" , "1000");
      return;
    }








    this.spinner.show();
    this.api.sign_up(this.sign_up).subscribe((res:any)=>{

      if(res.result){
        this.spinner.hide();
        this.api.swal_top("success" , res.msg , 3000);
      }else{
        this.spinner.hide();
        this.api.swal_top("error" , res.msg , 3000)
      }



    });
  }
  clear(){
      this.sign_up.first_name = "";
      this.sign_up.last_name = "";
      this.sign_up.password = "";
      this.sign_up.c_password = "";
      this.sign_up.bd = "";
      this.sign_up.email="";
  }


}
