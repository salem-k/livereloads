import { environment } from "./../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {SharedDataService} from "../../shared-data/shared-data.service";
import {LinkedinServiceService} from "../../linkedin-service/linkedin-service.service";
import {Router} from "@angular/router";
import {AlertController} from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class NetworkService {
  nbrError = 0;
  constructor(
      private http: HttpClient,
      public sharedData: SharedDataService,
      private router: Router,
      private linkedinService: LinkedinServiceService,
      private alertCtrl: AlertController
      ) {}

  getSollicitation() {
    return this.http.get(environment.URL + "salesfriends/infos");
  }
  getDetailSollication() {
    return this.http.get(
      environment.URL + "salesfriends/network/sollicitation/?page=1"
    );
  }
  postNetwork(data) {
    return this.http.post(environment.URL + "network/", data);
  }
  getNetwork(){
      return this.http.get(environment.URL + "network/");
  }
  getRelation(){
    return this.http.get(environment.URL + "network/relation");
  }
  postNetworkRelationAction(id,data){
      console.log(id);
    return this.http.post(environment.URL + "network/relation/"+id+"/action", data);
  }
  postSearchMatch(data) {
    return this.http.post(environment.URL + "network/search-match/", data);
  }
  async saveNetwork(){
    await this.sharedData.showLoading()
    let networks = JSON.parse(localStorage.getItem("myNetwork"))

    console.log("networks", networks);
    /*
      commentaire pour récupérer les déta ils des profil si besoin
      $anti_abuse_annotations: (5) [{…}, {…}, {…}, {…}, {…}]
      $recipeTypes: ["com.linkedin.voyager.dash.deco.web.mynetwork.ConnectionProfile"]
      $type: "com.linkedin.voyager.dash.identity.profile.Profile"
      entityUrn: "urn:li:fsd_profile:ACoAAAN48xgBTDpYQRYB-8Vg7V79-Kda_5aHFCw"
      firstName: "Aladin"
      headline: "Consultant senior chez Centre National des Ordres des Pharmaciens"
      lastName: "Seoud"
      profilePicture:
      $recipeTypes: ["com.linkedin.voyager.dash.deco.web.mynetwork.PhotoFilterPicture"]
      $type: "com.linkedin.voyager.dash.identity.profile.PhotoFilterPicture"
      displayImageReference: {vectorImage: {…}}
      __proto__: Object
      publicIdentifier: "aladinseoud"
      this.linkedinService.membreBudge(element.publicIdentifier).then((data)=>{
        let badge = JSON.parse(data.data);
        console.log(badge.premium)
      })
       */
      //this.linkedinService.getProfile(tempSingleNetwork.publicIdentifier).then((data)=>{
          
          let tempArraysNetwork = []
          if(localStorage.getItem("firstCall")=="0"){
              while(networks.length)
                  tempArraysNetwork[tempArraysNetwork.length] = networks.splice(0,500)
          }else{
              tempArraysNetwork = networks
          }

          console.log("tempArraysNetwork",tempArraysNetwork)
          //tempArraysNetwork.forEach((val,index)=>{
              localStorage.setItem("firstCall","1")
              let postData = tempArraysNetwork.shift()
              console.log("postData",postData)

              this.postNetwork(postData).subscribe(async (data)=>{
                  console.log(" subscribe networks",data)
                  localStorage.setItem("myNetwork",JSON.stringify(tempArraysNetwork))
                  if(!tempArraysNetwork.length){
                      await this.sharedData.hideLoading()
                      //await this.sharedData.showToastError("Synchrionisation bien passé !")
                      await this.router.navigateByUrl("/footer/searchTab1");
                  }else{
                    await this.saveNetwork()
                  }
              },async (error)=>{
                  console.log("Erreur envoie des contacts",JSON.stringify(error))
                  await this.sharedData.hideLoading()
                  await this.catchErrorSendContacts()
              })
          //})
  }
  async catchErrorSendContacts(){
        await this.sharedData.hideLoading()
        const alert = await this.alertCtrl.create({
            header: 'Erreur inscription !',
            message: 'Voulez vous réssayer ?',
            buttons: [
                {
                    text: 'Non',
                    handler: async () => {
                        await this.router.navigate(["/login-page"])
                    }
                },
                {
                    text: 'Oui',
                    handler: async () => {
                        await this.saveNetwork()
                    }
                }
            ]
        });
        await alert.present()
    }
    updateContact(idNetwork,data){
        return this.http.post(environment.URL + "network/"+idNetwork+"/solicitable/true", data);

    }
    
    onSalesFriends(id){
        return this.http.get(environment.URL + "network/"+id+"/on-salesfriends/");
    }
}
