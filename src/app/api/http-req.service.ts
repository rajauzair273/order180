import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import Swal from "sweetalert2";

@Injectable({
  providedIn: "root",
})
export class HttpReqService {
  server_url = "http://arslanbamta.ml/order/index.php/welcome/";
  constructor(public http: HttpClient) {}

  swal_top(type, msg, time) {
    Swal.fire({
      position: "top-end",
      icon: type,
      title: msg,
      showConfirmButton: false,
      timer: time,
    });
  }

  check() {
    return this.http.post("http://arslanbamta.ml/order/", {
      withCredentials: true,
    });
  }
  check_session() {
    return this.http.get(this.server_url + "check_session", {
      withCredentials: true,
    });
  }

  sign_up(data: any) {
    data = this.convert_to_get(data);

    return this.http.get(this.server_url + "sign_up" + data, {
      withCredentials: true,
    });
  }

  login(data: any) {
    data = this.convert_to_get(data);
    return this.http.get(this.server_url + "login" + data, {
      withCredentials: true,
    });
  }

  forget(data : any){
    data = this.convert_to_get(data);
    return this.http.get(this.server_url + "forget" + data, {
      withCredentials: true,
    });
  }
  submit_doc(data : any){
    data = this.convert_to_get(data);
    return this.http.get(this.server_url + "submitFile" + data, {
      withCredentials: true,
    });
  }

  convert_to_get(hipChatSettings) {
    var pairs = [];

    for (var prop in hipChatSettings) {
      if (hipChatSettings.hasOwnProperty(prop)) {
        var k = encodeURIComponent(prop),
          v = encodeURIComponent(hipChatSettings[prop]);
        pairs.push(k + "=" + v);
      }
    }

    var str = "?" + pairs.join("&");
    return str;
  }
}
