import { Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.scss']
})
export class DropDownComponent implements OnInit {
user : any ;
  constructor(
    public storage : LocalStorage ,
    public route: Router
  ) {
    this.storage.getItem("user").subscribe((res)=>{
      if(res && res!=null){
     this.user = res ;

      }

    })
   }

  ngOnInit() {
  }

  logout(){
    this.storage.clear().subscribe((res)=>{
      this.route.navigateByUrl("accounts");
    })
  }

}
