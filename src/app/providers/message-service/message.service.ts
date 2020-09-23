import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "./../../../environments/environment.prod";

@Injectable({
  providedIn: "root"
})
export class MessageService {
  constructor(public http: HttpClient) {}

  saveMsg(dataToPost) {
    return this.http.post(environment.URL + "messages/", dataToPost);
  }
  getDefautlMessge(type) {
    return this.http.get(environment.URL + "messages/default/" + type + "/");
  }
  getDefautlMessgeType() {
    return this.http.get(environment.URL + "messages/by-default-user");
  }
  saveDefautlMessge(data) {
    return this.http.post(environment.URL + "messages/by-default-user", data);
  }
  getMessageInvitation(status) {
    return this.http.get(environment.URL + "messages/pending/" + status + "/");
  }
  getMessageReceived(){
    return this.http.get(environment.URL + "messages/received/");
  }
  getMessageSended(){
    return this.http.get(environment.URL + "messages/sended/");
  }
  getMessagePending(){
    return this.http.get(environment.URL + "messages/pending-invitation/");
  }
  deleteMessagePending(id){
    return this.http.delete(environment.URL + "messages/"+id+"/remove-pending-invitation/");
  }
  getMessage() {
    return this.http.get(environment.URL + "messages/");
  }
  updateMessage(id, value) {
    return this.http.patch(environment.URL + "messages/" + id + "/", {
      status: value
    });
  }
}
