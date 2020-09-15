import { Component } from '@angular/core';
import { Router , NavigationEnd  } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { throwIfEmpty } from 'rxjs/operators';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'order180';
  constructor(public route: Router , public storage : LocalStorage ){
    this.storage.getItem("user").subscribe((res:any)=>{
      console.log(res);
      if(res && res != null){
        this.route.navigateByUrl("greeting");
      }
      else{
        this.route.navigateByUrl("accounts");
      }
    })


    this.route.events.subscribe((e:any) => {

      if(e.NavigationStart.url == "/forget"){
        return;
          }
      if (e instanceof NavigationEnd) {


        this.storage.getItem("user").subscribe((res:any)=>{
          console.log(res);
          if(res && res != null){

          }
          else{
            this.route.navigateByUrl("accounts");
          }
        })

      }
   });

  }
}
