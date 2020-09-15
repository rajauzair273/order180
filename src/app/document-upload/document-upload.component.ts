
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpReqService } from './../api/http-req.service';
import { Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';




@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.scss']
})
export class DocumentUploadComponent implements OnInit {
  user : any ;
  data : any ;
  text = "";
  constructor(public storage : LocalStorage ,
    public route : Router ,
    public api : HttpReqService ,
    public spinner : NgxSpinnerService) { }

  ngOnInit() {

    this.storage.getItem("user").subscribe((res)=>{
      if(res && res!=null){
     this.user = res ;
    this.data = res ;
      }
      else{
        this.route.navigateByUrl("accounts");
      }
    })
  }

  logout(){
    this.storage.clear().subscribe((res)=>{
      this.route.navigateByUrl("accounts");
    })
  }

  submit(){
    if(this.text == ""){
      this.api.swal_top("error" , "Document field Required" , 1000);
      return ;
    }

    this.spinner.show();

    this.data.text = this.text ;
    this.api.submit_doc(this.data).subscribe((res:any)=>{
      this.spinner.hide();
      if(res.result){
        this.text="";
      this.route.navigateByUrl("dashboard");
        this.api.swal_top("success" , res.msg , 1000);
      }else{
        this.api.swal_top("error" , res.msg , 1000);
      }
    });



  }


}
