import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NavController } from '@ionic/angular';
import { myLeaveAnimation } from 'src/app/animations/leave';
import { myenterSearch } from 'src/app/animations/enterPageSearch';
import { UserService } from 'src/app/providers/user-service/user.service';
import { LinkedinServiceService } from 'src/app/providers/linkedin-service/linkedin-service.service';
import { NetworkService } from 'src/app/providers/salesfriends/network/network.service';
import { SharedDataService } from 'src/app/providers/shared-data/shared-data.service';
import { SearchService } from 'src/app/providers/search/search.service';
import { myenterNewSearch } from 'src/app/animations/enterNewSearch';
import { MessageService } from '../../providers/message-service/message.service';

@Component({
  selector: 'app-search-tab1',
  templateUrl: './search-tab1.page.html',
  styleUrls: ['./search-tab1.page.scss'],
})
export class SearchTab1Page implements OnInit {
  showFiltre: boolean = false;
  clicked1: boolean = true;
   clicked2: boolean = false;
   clicked3: boolean = true;
   clicked4: boolean = true;
   clicked5: boolean = false;
   clickedd1: boolean = false;
   clickedd2: boolean = false;
   clickedd3: boolean = false;
   clickedd4: boolean = false;
   firstSearch: boolean = false;
   showFiltre2: boolean = false;
   clickedCard1: boolean = false;
   clickedCard2: boolean = false;
   pageNewSearchShown = false
   active = true
   option1 = {
    // loop: true,
    direction: 'vertical',
    allowSlideNext: false,
   };
   searchs = false
   
   selectedSearchId = false
   invitationSended: any = [];
   invitation: any = [];
   total_potential_search
   total_realised_intro
   total_hits
   lengthList=0;
   lengthInActives = 0
   lengthActives = 0
   cssBtn
  constructor(
    private router: Router,
    private navCtrl: NavController,
    private userService: UserService,
    private linkedinService: LinkedinServiceService,
    private networkService: NetworkService,
    public sharedData: SharedDataService,
    private searchService: SearchService,
    private messageService: MessageService
  ) {

    this.router.events.subscribe((e:any) => {
      
      if (e instanceof NavigationEnd && e.url == "/footer/searchTab1"){
          this.initData()
      }
   });
    this.userService.saveDeviceToken().subscribe(data=>{
    //alert("data saved "+data);
   },error=>{
    /// alert("saveDeviceToken ::: "+JSON.stringify(error))
   });
  }
  goOpportunity(id,total) {
    //SSS
    if(total > 0)
      this.router.navigateByUrl('/opportunity/' + id);
  }
  goPotentielReseau(id,total) {
    //SSS
    if(total > 0)
      this.router.navigateByUrl('/potentiel-reseau/' + id);
  }
  goIntroRealises(id,total) {
    //SSS
    if(total > 0)
      this.router.navigate(['intro-realises']);
  }
  goGeneralIntroRealises() {
    this.router.navigate(['general-intro-realises']);
  }
  getSearchs(){
    this.total_potential_search = this.total_realised_intro = this.total_hits = 0

    this.searchService.getSearch().subscribe(async (data:any)=>{
      console.log("DATA DTA",data);
      
      if(data.results.length == 0 && this.pageNewSearchShown == false){
        this.pageNewSearchShown = true
        await this.sharedData.hideLoading()
        this.goPageNewsearch()
        return
      }

      let searchs = []
      data.results.forEach(element => {
        searchs.push({
          created_at: element.created_at,
          hits: element.hits,
          id:  element.id,
          location: (element.location)?element.location.split(","):"",
          motif: element.motif,
          poste: (element.poste)?element.poste.split(","):"",
          potential_search: element.potential_search,
          realised_intro: element.realised_intro,
          title: element.title,
          activate:element.activate,
          showDetail:false,
          showFiltre:false
        })
        if(element.activate){
          this.total_potential_search+=parseInt(""+element.potential_search) 
          this.total_realised_intro+=parseInt(""+element.realised_intro)
          this.total_hits+= (element.hits_friends) ? parseInt(""+element.hits_friends) : 0
        }

        
        /*
          hits_friends: null
          hits_network: null
        */
      });
      this.lengthActives = 0
      searchs.forEach(element=>{
        if(element.activate)
          this.lengthActives++
      })
      this.cssBtn = ""
      if(this.lengthActives == 0)
        this.cssBtn = "toTop"
      
      this.linkedinService.getSearchHits(searchs);

      this.lengthInActives = searchs.length - this.lengthActives

      if(this.lengthInActives == 0)
        this.active= true;

      console.log("searchssearchssearchssearchssearchs",searchs)
      console.log("searchssearchssearchssearchssearchs",JSON.stringify(searchs))
      
      this.sharedData.setSearchs(searchs)
      await this.sharedData.hideLoading();
    },async error=>{
      await this.sharedData.hideLoading()
    })
  }
  async initData(){
    

    await this.sharedData.showLoading()
    this.userService.getUser().subscribe((data:any) =>{

      localStorage.setItem("username",data.user.linkedin.email)
      localStorage.setItem("password",data.user.linkedin.password)

      localStorage.setItem("User",JSON.stringify(data.user))
      console.log("DATA USERR ::: ",data)

      localStorage.setItem("firstCall","1")
      
      this.total_potential_search = this.total_realised_intro = this.total_hits = 0 

      this.getSearchs()

      if(!localStorage.getItem("myNetwork")){
        this.networkService.getNetwork().subscribe(async (networks:any)=>{
          console.log("récupération networks",networks);
          let networkss = networks;
          networkss.sort((a, b) => a.connected_at - b.connected_at );
          localStorage.setItem("myNetwork",JSON.stringify(networkss))
          await this.sharedData.hideLoading();
        },async error=>{
          console.log(error);
          await this.sharedData.hideLoading();
          this.sharedData.showToastErrorServer()
          //alert("problème au niveau de recuperation votre reseau linkedin")
        })
      }


      if(!localStorage.getItem("li_at")){
        this.linkedinService.getCookiesLinkedin().then(async (datatemp:any) => {
          console.log(datatemp);
          this.linkedinService
              .loginLinkedin(     localStorage.getItem('username'),
              localStorage.getItem('password'))
              .then(async (loginLinkedinData)=>{
                  console.log("loginLinkedinData",loginLinkedinData);
                  
                  loginLinkedinData.headers["set-cookie"].split(";").forEach(value => {
                      if (value.indexOf("li_at") != -1) {
                          this.linkedinService.li_at = value.split("=")[1].split(";")[0]
                          localStorage.setItem('li_at',this.linkedinService.li_at)
                      }
                      if (value.indexOf("JSESSIONID") != -1) {
                          this.linkedinService.csrf = value.split("=")[1].split(";")[0].replace(/\"/g, "")
                          localStorage.setItem('csrf',this.linkedinService.csrf)
                      }
                  });
                  
                }).catch(async error=>{
                  
                  console.error(error)
                  
                })
          }).catch(async error=>{
            
            console.error("Erreur getCookiesLinkedin",error)
          })
      }
  },async error=>{
    await this.sharedData.hideLoading();
    alert("problème au niveau de recuperation vos informations ")
    this.userService.clearSessionDataInLocalStorage();
  })
   }
  ngOnInit() {
    this.messageService.getMessageSended().subscribe((data: any) => {

      this.invitationSended = data.results;
      this.invitationSended=this.invitationSended.filter((e) => e.status == "P" && e.content != "");
      this.sharedData.setMessageInvitationSended(this.invitationSended);
    })

    this.messageService.getMessageReceived().subscribe((data: any) => {
      let invitations: any = [];
      invitations = data.results;
      console.log(data);
      this.invitation = invitations.filter((e) => e.status == "P");
      this.sharedData.setMessageInvitation(this.invitation);

      //   this.linkedinService.getProfile(this.invitations[0].public_identifier.replace("urn:li:fs_miniProfile:", "")).then((data)=>{
      //     const profile = JSON.parse(data.data);

      //     profile.included.forEach(element => {

      //       if (element.$type == "com.linkedin.voyager.identity.shared.MiniProfile"){

      //         this.invitation[0].picture = element.picture.rootUrl + element.picture.artifacts[2].fileIdentifyingUrlPathSegment

      //       }
      //     });

      // });
    });
  }
  concatList(location,poste){
    this.lengthList = location.concat(poste).length;
    return location.concat(poste);
  }
  clickCard(id) {
    let searchs = this.sharedData.getSearchs()
    searchs.forEach(function(element) {
      if(element.id == id)
      element.showDetail = !element.showDetail
    });
    this.sharedData.setSearchs(searchs)
  }
  calculateRest(array){
    if(array.length <= 2)
      return ""
    return   "+" + (array.length -2) + " Autres";
  }
  status(id){
    let searchs = this.sharedData.getSearchs()
    let search = searchs.filter(function(element) {
      if(element.id == id){
        return element.activate
      }
    });
    return (search[0]?.activate)?true:false
    

  }
  toggleFiltre(id){
    let searchs = this.sharedData.getSearchs()
    searchs.forEach(function(element) {
      if(element.id == id)
        element.showFiltre = !element.showFiltre
    });
    this.sharedData.setSearchs(searchs)
  }

  async desactivateSearch(id){
    let searchs = this.sharedData.getSearchs()
    let selectedSearch = searchs.filter(function(element) {
      if(element.id == id){
        return element
      }
    });
    
    selectedSearch[0].activate = !selectedSearch[0].activate
    selectedSearch[0].poste = (selectedSearch[0].poste && selectedSearch[0].poste.length)?selectedSearch[0].poste.join(","):""
    selectedSearch[0].location = (selectedSearch[0].location && selectedSearch[0].location.length)?selectedSearch[0].location.join(","):""

    await this.sharedData.showLoading()
    this.searchService.putSearch(selectedSearch[0]).subscribe(async (data:any)=>{

      this.getSearchs()
    },async error=>{
      this.sharedData.showToastError("Erreur connexion !")
      await this.sharedData.hideLoading()
    })
    
    
  }
  motif() {
    this.clickedCard2 = true;
  }
  goPageNewsearch() {
    // this.router.navigate(["/new-search"]);
    //this.navCtrl.navigateForward('new-search', { animation: myenterSearch })
    localStorage.removeItem("currentSearch")
    this.navCtrl.navigateForward('new-search2', { animation: myenterNewSearch })
  }
  goPageEditSearch(id) {
    this.navCtrl.navigateForward(['/edit-search',id])
  }
  openModalFiltre(id) {
    this.selectedSearchId = id
    this.sharedData.popupFiltre = true
  }
  closeModalFiltre() {
    this.selectedSearchId = false
    this.sharedData.popupFiltre = false
  }

  openModalGeneralFiltre() {
    this.showFiltre = true;
    this.sharedData.popupFiltre = true;
  }
  closeModalGeneralFiltre() {
    this.showFiltre = false;
    this.sharedData.popupFiltre = false;
  }
  
  click1() {
    this.clicked1 = true;
    this.clicked2 = false;
    this.clicked3 = true;
    this.clicked4 = true;
    this.clicked5 = false;
  }
  click2() {
    this.clicked1 = false;
    this.clicked2 = true;
    this.clicked3 = true;
    this.clicked4 = true;
    this.clicked5 = false;
  }
  calculateHints(hints){
    return Math.trunc(hints/10000) + "k"
  }
  dateSearch(date){
    const today = new Date().getTime();
    const createdAT = new Date(date).getTime();
    const diffMs = (today - createdAT); // milliseconds between now & Christmas
    const diffDays = Math.floor(diffMs / 86400000); // days
    const diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
    if (diffDays > 0){
      return "Mise à jour Il y A " + diffDays + " jours";
    } else if (diffHrs > 0) {
      return "Mise à jour Il y A " + diffHrs + " heures";
    } else if (diffMins > 0 ){
      return "Mise à jour Il y A " + diffMins + " minutes";
    } else { 
    return "Mise à jour Il y A 1 minutes";
    }
  }
  sortAlphabetical() {
    this.clicked1 = false;
    this.clicked2 = false;
    this.clicked3 = true;
    this.clicked4 = true;
    this.clicked5 = true;
    let searchs = this.sharedData.getSearchs()
    console.log(searchs);
    
    searchs = searchs.sort( (a, b)=>{
        a = a.title.toLowerCase();
        b = b.title.toLowerCase();
        return (a < b) ? -1 : (a > b) ? 1 : 0;

    });
    console.log(searchs);

    this.sharedData.setSearchs(searchs)
    
  }
  sortDate(direction) {
    this.clicked1 = false;
    this.clicked2 = false;
    this.clicked3 = (direction>0)?true:false
    this.clicked4 = (direction<0)?true:false
    this.clicked5 = false;
    
    let searchs = this.sharedData.getSearchs()
    console.log(searchs);
    
    searchs = searchs.sort( (a, b)=>{
        a = new Date(a.created_at).getTime()
        b = new Date(b.created_at).getTime()

        if(direction>0)
          return (a < b) ? -1 : (a > b) ? 1 : 0;
        else
          return (a > b) ? -1 : (a < b) ? 1 : 0;
        
    });
    console.log(searchs);

    this.sharedData.setSearchs(searchs)
    
  }
  slideChanged(event) {
    console.log(event.srcElement.scrollHeight)
    if(event.srcElement.scrollHeight> 800){
      this.showFiltre = false;
      this.showFiltre2 = false;
      this.selectedSearchId = false
      this.sharedData.popupFiltre = false;
    }
    
  }
  clickk1() {
    this.clickedd1 = true;
    this.clickedd2 = false;
    this.clickedd3 = false;
    this.clickedd4 = false;
  }
  clickk2() {
    this.clickedd1 = false;
    this.clickedd2 = true;
    this.clickedd3 = false;
    this.clickedd4 = false;
  }
  
  clickk4() {
    this.clickedd1 = false;
    this.clickedd2 = false;
    this.clickedd3 = false;
    this.clickedd4 = true;
  }
  goActivePage() {
    this.active= true;
  }
  goInactivePage() {
    let searchs = this.sharedData.getSearchs()
    let inactiveSearchs = searchs.filter((element, index, array)=>{ 
      return (element.activate == false)
    })
    if(inactiveSearchs.length > 0)
      this.active= false;
  }


}
