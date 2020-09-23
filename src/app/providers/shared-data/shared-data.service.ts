import { Injectable } from "@angular/core";
import { LoadingController, ToastController } from "@ionic/angular";

@Injectable({
  providedIn: "root"
})
export class SharedDataService {
  registerData: any = [];
  loading: any;
  popupDecline = false
  popupAccept = false
  popupShake = false
  popupFiltre = false
  picture = "assets/images/user.png";
  invitations:any = [];
  invitationsSended:any = [];
  from_search:any;
  searchs
  constructor(
    private loadingController: LoadingController,
    private toastController: ToastController,
  ) {}
  setFromSearch(data){
    this.from_search=data;
  }
  getFromSearch(){
    return this.from_search;
  }
  setRegisterData(data) {
    this.registerData = data;
  }
  getRegisterData() {
    console.log("registerData",JSON.stringify(this.registerData))
    return this.registerData;
  }
  setMessageInvitation(data){
  this.invitations = data;
  }
  getMessageInvitation(){
    return this.invitations;
  }
  setMessageInvitationSended(data){
    this.invitationsSended = data;
  }

  getMessageInvitationSended(){
    return this.invitationsSended;
  }
  setSearchs(data){
    this.searchs = data
  }
  getSearchs(){
    return this.searchs
  }
  async showLoading() {
    if(!this.loading){
      this.loading = await this.loadingController.create({
        cssClass: "my-custom-class",
        message: "Chargement..."
      });
      await this.loading.present();
    }
  }
  async hideLoading() {
    if(this.loading)
      await this.loading.dismiss();
    this.loading = false
  }
  async showToastError(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 10000,
      position: 'top'
    });
    toast.present();
  }
  async showToastErrorServer() {
    const toast = await this.toastController.create({
      message: "Probleme serveur .",
      duration: 2000
    });
    toast.present();
  }
}
