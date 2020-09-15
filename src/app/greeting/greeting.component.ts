import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-greeting',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.scss']
})
export class GreetingComponent implements OnInit {
user:any ;
  constructor(
    public route: Router ,
    public storage :LocalStorage
  ) { }

  ngOnInit() {

this.storage.getItem("user").subscribe((res)=>{
        if(res && res!=null){
          this.user = res;
        }else{
          this.route.navigateByUrl("accounts");
        }
})
  }
  uploadpage(){

    this.route.navigateByUrl("document-upload");
  }
  logout(){
    this.storage.clear().subscribe((res)=>{
      if(res){
        this.route.navigateByUrl("accounts");
      }
    });

  }

}
