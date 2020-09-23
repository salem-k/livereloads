import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Device } from '@ionic-native/device/ngx';
import { Platform } from "@ionic/angular";
import { environment } from "./../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(
      public http: HttpClient,
      private device: Device,
      private platform:Platform
  ) {}

  register(dataToPost) {
    console.log("Data send to api", dataToPost);

    return this.http.post(environment.URL + "users/", dataToPost);
  }

  login(dataToPost) {
    return this.http.post(environment.URL + "users/login/", dataToPost);
  }


  checkEmail(email) {
    return this.http.post(environment.URL + "users/lkd/", {"email":email})
  }
  passwordReset(data){
    return this.http.post(environment.URL + "users/password/reset", data)
  }

  getUser() {
    return this.http.get(environment.URL + "users/")
  }

  clearSessionDataInLocalStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    localStorage.removeItem('User');
  }

  saveDeviceToken(){
        console.log('Send device Data for Fcm');
        let dataToPost = {
          name:this.device.model,
          registration_id:localStorage.getItem("fcm_token"),
          device_id:this.device.uuid,
          active:true,
          type:(this.device.platform+"").toLowerCase()
        }
        return this.http.post(environment.URL + "devices", dataToPost);


  }
}
