import { NgxSpinnerService } from 'ngx-spinner';
import { HttpReqService } from './../api/http-req.service';
import { Component, OnInit, enableProdMode } from '@angular/core';


@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.scss']
})
export class ForgetComponent implements OnInit {
   reset_pass :any = {
     email :"" ,
     password: "",
     c_password : ""
   }
  constructor(
    public api : HttpReqService ,
    public spinner : NgxSpinnerService
  ) { }

  ngOnInit() {
  }

  reset(){
        if(this.reset_pass.email == ""){
          this.api.swal_top("error" , "Email is required" , 1000);
          return ;
        }
        if(this.reset_pass.password == ""){
          this.api.swal_top("error" , "Password is not required" , 1000);
          return ;
        }
        if(this.reset_pass.c_password == ""){
          this.api.swal_top("error" , "Confirm password is not required" , 1000);
          return ;
        }
        if(this.reset_pass.password != this.reset_pass.c_password){
          this.api.swal_top("error" , "Password not match" , 1000);
          return ;
        }
        this.spinner.show();
        this.api.forget(this.reset_pass).subscribe((res : any)=>{
          this.spinner.hide();
             if(res.result){
              this.api.swal_top("success" , res.msg , 2000);
             }else{
              this.api.swal_top("error" , res.msg , 2000);
             }
        })





  }

}
