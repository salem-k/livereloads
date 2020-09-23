import { Component, OnInit, ElementRef, ViewChild, HostListener, Renderer2 } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { IonPullUpFooterState } from 'ionic-pullup';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { SharedDataService } from 'src/app/providers/shared-data/shared-data.service';
import { SearchService } from 'src/app/providers/search/search.service';
import { Animation, Gesture, GestureController, ModalController, NavController, Platform } from '@ionic/angular';
import { NetworkService } from 'src/app/providers/salesfriends/network/network.service';
import { LinkedinServiceService } from 'src/app/providers/linkedin-service/linkedin-service.service';

@Component({
  selector: 'app-new-search2',
  templateUrl: './new-search2.page.html',
  styleUrls: ['./new-search2.page.scss'],
})
export class NewSearch2Page implements OnInit {
focused: boolean = true;
criteresClicked: boolean = false;
getValue;
currentSearch
valueInput = "";
spinner = false;
results: boolean = false;
clickedCard: boolean = false;

showContent: boolean = false;
footerState: IonPullUpFooterState;
state: boolean = false;
footer: boolean = false;
toggled: boolean = false;
focusedIonSearchBar: boolean = true;
@ViewChild('searchInput') sInput;
private animation?: Animation;
private gesture?: Gesture;

private started: boolean = false;
private initialStep: number = 0;
private MAX_TRANSLATE: number = 400;

motif = "Zagett est extrêment pertinent sur le devellopement de contenu et a notamment fondé la content factory de Sephora. Il aimerait te rencontrer et te présenter des cas qui pourrait vraiment t’interesser."

nbrRequestsGeo
nbrRequestsGeoDone
nbrRequestsSector
nbrRequestsSectorDone

geos
sectors
resultCount
anim: boolean = false;
@ViewChild('logo', {read: ElementRef, static: true})
logo: ElementRef
focusedTextArea: boolean = false;
valueforngif: boolean = false;
constructor(
              private keyboard: Keyboard,
                private router: Router,
                private location: Location,
                private searchService: SearchService,
                private modalController: ModalController,
                public navCtrl: NavController,
                private networkService: NetworkService,
                public sharedData: SharedDataService,
                private linkedinService: LinkedinServiceService,
                public gestureCtrl : GestureController,
                public renderer: Renderer2,
                public platform: Platform,
              )
              { 
                this.router.events.subscribe((e:any) => {
      
                  if (e instanceof NavigationEnd && e.url == "/new-search2"){
                      //this.search({"key":"Enter"})
                  }
               });
               platform.ready().then(()=>{
                this.keyboard.onKeyboardShow().subscribe(()=>{this.valueforngif=true;});
                this.keyboard.onKeyboardHide().subscribe(()=>{this.valueforngif=false});
              })
                this.footerState = IonPullUpFooterState.Collapsed;
              }

  ngOnInit() {
    /*
    if(this.myInput)
      this.myInput.nativeElement.focus();
      */
     setTimeout(()=>{
     this.sInput.setFocus();
    }, 250);
    
  }
  ionViewWillEnter() {
    this.currentSearch = JSON.parse(localStorage.getItem("currentSearch"))
    console.log(this.currentSearch)
    if(this.currentSearch.geos.length != 0 || this.currentSearch.sectors.length != 0 ){
      this.doSearch();
    }
    //this.valueInput = ""
    // this.results = false;
    // this.clickedCard = false;
    // this.showContent = false;
    // this.state = false;
    // this.footer = false;
    
  }
  onFocusTextArea() {
    this.focusedTextArea = true;
  }
  onBlurTextArea() {
    this.focusedTextArea = false;
  }
  // async ngAfterViewInit() {
  //     let gesture = await this.gestureCtrl.create({
  //       el: this.logo.nativeElement,
  //       gestureName: 'my-gesture',
  //       gesturePriority: 100,
  //       threshold: 5,
  //       direction:'y',
  //       passive: false,
  //       onStart: () => {
  //         console.log('starting');
  //         this.renderer.setStyle(this.logo.nativeElement, 'transition','none')
  //       },
  //       onMove: ev => {
  //         if(this.toggled && ev.deltaY > 0) {
  //           this.renderer.setStyle(
  //             this.logo.nativeElement,
  //             "transform",
  //             `translateY(${ev.deltaY}px)`
  //             );
  //         }
  //         console.log(ev);

  //       },

  //       onEnd: ev => {
  //         console.log('ending');
  //         console.log(ev);
  //         // this.renderer.setStyle(
  //         //   this.logo.nativeElement,
  //         //   "transition",
  //         //   "0.4s ease-out"
  //         // );
  //         if(ev.deltaY > 125 && ev.deltaY <600) {
  //           this.renderer.setStyle(
  //             this.logo.nativeElement,
  //             "transform",
  //             `translateY(600px)`
  //           );
  //           // this.renderer.setStyle(
  //           //   this.logo.nativeElement,
  //           //   "transform",
  //           //   `translateY(0px)`
  //           // );

  //         } else if(ev.deltaY < -125) {
  //           // this.renderer.setStyle(
  //           //   this.logo.nativeElement,
  //           //   "transform",
  //           //   `translateY(-400px)`
  //           // )
  //         }else if(ev.deltaY >= 600) {
  //           this.closeModal();
  //         } else {
  //           this.renderer.setStyle(
  //             this.logo.nativeElement,
  //             "transform",
  //             `translateY(0px)`
  //           );
  //         }
  //       }
  //     });
  //     gesture.enable(true);

  // }
  logForm() {
    console.log('here')
  }
  onFocus() {
    this.criteresClicked = false;
    if(this.focusedIonSearchBar == false)
    this.focusedIonSearchBar = true;
    this.focused = true;
    console.log(this.focusedIonSearchBar)
  }
  onBlur() {
    this.focusedIonSearchBar = false;
    this.focused = false;
    console.log(this.focusedIonSearchBar)
  }
  closeModal() {
    this.anim= true;
   
    setTimeout(() => {
      this.toggled = false;
      this.anim= false;
    },400)
  }
  toggleModal() {
    this.toggled = !this.toggled;
  }
  somethingMoved(event) {
    console.log(event);
  }
  editCard() {
    this.clickedCard = true;
  }
  clickCriteres() {
    this.criteresClicked = true;
  }
  closeCriteres() {
    this.criteresClicked = false;
  }
  next() {
    this.results = true;
  }
  saveSearch(){

    console.log(this.nbrRequestsSector,this.nbrRequestsSectorDone,this.nbrRequestsGeo,this.nbrRequestsGeoDone)
    
    if(
      this.nbrRequestsSector == this.nbrRequestsSectorDone
      && this.nbrRequestsGeo == this.nbrRequestsGeoDone
      ){ 
      
        // this.sharedData.showLoading()
        this.spinner = true;

      console.log("this.sectores",this.sectors);
      console.log("this.geos",this.geos);
      let searchParams = this.getListForSearch()
      console.log("searchParams : ",searchParams)
      this.linkedinService.globalSearch(0,searchParams,this.valueInput).then(async (data:any)=>{
        let currentSearch = JSON.parse(localStorage.getItem("currentSearch"))
        console.log("DATA SEARCH LINKEDIN",data);
        console.log("DATA SEARCH LINKEDIN",JSON.parse(data.data));
        console.log("JSON.parse(data.data).data.metadata.",JSON.parse(data.data).data.metadata);
        if(JSON.parse(data.data).data.metadata.totalResultCount == 0 ){
          this.sharedData.showToastError("Pas des résultats pour cette recherche")
          return
        }
        this.resultCount = JSON.parse(data.data).data.metadata.totalResultCount
        if(this.resultCount > 1000) this.resultCount = 1000

        // await this.sharedData.hideLoading()

        this.showResult()
        //alert("Total SEARCH = "+JSON.parse(data.data).data.metadata.totalResultCount)
        let params = {
          "poste": (currentSearch && currentSearch.sectors)?currentSearch.sectors.join():"" ,
          "location": (currentSearch && currentSearch.geos)?currentSearch.geos.join():"",
          "title": this.valueInput,
          "motif": this.motif,
          "potential_search": this.resultCount
        }
        console.log("@@@@@@@params@@@@@@@@@@@@",params);
        
        if(JSON.parse(data.data).data.metadata.totalResultCount > 0){
          this.searchService.postSearch(params).subscribe(async (data:any)=>{
            localStorage.removeItem("currentSearch")
            console.error("DAT DATA SEACH",data);
            
            // await this.sharedData.hideLoading()
            this.spinner = false;
            
            //await this.router.navigate(["/footer/searchTab1"])
            await this.router.navigateByUrl("/footer/searchTab1")
            
          },async error=>{
            
            this.focused = false;
            this.spinner = false;
            this.results = true;
            this.footer = true;

            this.toggle()

            // await this.sharedData.hideLoading()
            this.spinner = false;
            console.log("erreur save",error);
            if(error.error && error.error.non_field_errors){
              this.sharedData.showToastError("Vous avez déjà une recherche avec les mêmes critères")
            }else{
              alert("Erreur : "+JSON.stringify(error))
            }
          })
        }
      }).catch(erreur=>{
        alert("Erreur Search linkedIN : "+JSON.stringify(erreur) )
      })
  }

  }
  showResult(){

    this.focused = false;
    this.spinner = false;
    this.results = true;
    this.footer = true;
  }
  doSearch(){
    // this.sharedData.showLoading()
    if(this.valueInput==""){
      return false
    }

    this.spinner = true;

    let currentSearch
    currentSearch = JSON.parse(localStorage.getItem("currentSearch"))

    this.nbrRequestsGeo = this.nbrRequestsGeoDone = 0
    this.nbrRequestsSector = this.nbrRequestsSectorDone = 0

    this.geos = []
    this.sectors = []

    
    
    console.log("currentSearch currentSearch currentSearch",currentSearch);
     
    
    if(currentSearch && currentSearch.geos) currentSearch.geos.forEach(async element => {
      this.nbrRequestsGeo++
      this.getUrnGeo(element) 
    })
    if(currentSearch && currentSearch.sectors) currentSearch.sectors.forEach(async element => {
      this.nbrRequestsSector++
      this.getUrnSector(element) 
    })
    
    if(this.nbrRequestsSector == 0 && this.nbrRequestsGeo == 0)
      this.checkIfRequestsDone()
  }
  async getUrnGeo(keyword){
    console.log("this.linkedinService.searchGeo(keyword)",keyword)
    console.log(keyword.substring(0, keyword.length - 1));
    return this.linkedinService.searchGeo(keyword.toLowerCase()).then(
            ((data:any)=>{
            console.log(data);
            
                let tempElements = JSON.parse(data.data)
                console.log(tempElements);
                let returnElements
                tempElements.data.elements.forEach((element:any) => {
                  if(element.text.text == keyword){
                    this.geos.push(element.targetUrn.replace("urn:li:fs_geo:",""))
                  }
                });

                this.nbrRequestsGeoDone++
                this.checkIfRequestsDone()
            })
      );
  }
  async getUrnSector(keyword){
    console.log("this.linkedinService.searchGeo(keyword)",keyword)
    return this.linkedinService.searchSector(keyword.substring(0, keyword.length - 1)).then(
            ((data:any)=>{
              console.log(data);
                let tempElements = JSON.parse(data.data)
                let returnElements
                tempElements.data.elements.forEach((element:any) => {
                  if(element.text.text == keyword){
                    this.sectors.push(element.targetUrn.replace("urn:li:fs_industry:",""))
                  }
                });

                this.nbrRequestsSectorDone++
                this.checkIfRequestsDone()
            })
      );
  }
  getListForSearch(){
    let searchParams = []
    console.log(this.geos);
    if(this.geos && this.geos.length ) searchParams.push("geoUrn-%3E"+this.geos.join("%7C"))
    if(this.sectors && this.sectors.length ) searchParams.push("industry-%3E"+this.sectors.join("%7C"))

    searchParams.push("network-%3ES")
    searchParams.push("resultType-%3EPEOPLE")
    console.log("SEARCH PARAMS",searchParams)
    return searchParams.join()
  }
  checkIfRequestsDone(){

    if(
        this.nbrRequestsSector == this.nbrRequestsSectorDone
        && this.nbrRequestsGeo == this.nbrRequestsGeoDone
        ){ 
        
        console.log("this.sectores",this.sectors);
        console.log("this.geos",this.geos);
        
        let searchParams = this.getListForSearch()
        
        console.log("searchParams : ",searchParams)
        



        this.linkedinService.globalSearch(0,searchParams,this.valueInput).then(async (data:any)=>{


          
          this.showResult()



          console.log("DATA SEARCH LINKEDIN",data);
          console.log("DATA SEARCH LINKEDIN",JSON.parse(data.data));
          console.log("JSON.parse(data.data).data.metadata.",JSON.parse(data.data).data.metadata);

          this.resultCount = JSON.parse(data.data).data.metadata.totalResultCount
          if(this.resultCount > 1000)
            this.resultCount = 1000

          // await this.sharedData.hideLoading()

          
          
          
        }).catch(erreur=>{
          this.spinner = false;
          alert("Erreur Search linkedIN : "+JSON.stringify(erreur))
        })
      
      
      

    }

  }
  search(event) {
    // this.focusedIonSearchBar = false;
    if(event && event.key != "Enter")
      return
    this.focused = false;
    this.spinner = false;
    this.results = true;
    this.footer = true;

    this.doSearch()
  }
  goBack() {
    this.location.back();
  }
  toggle() {
    this.footerState = this.footerState == IonPullUpFooterState.Collapsed ? IonPullUpFooterState.Expanded : IonPullUpFooterState.Collapsed;
    console.log(this.state)
  }
  goSearchPage() {
    this.router.navigate(["/footer/searchTab1"]);
  }
  goPageNewSearchMetier() {
    this.router.navigate(["/new-search-metier"]);
  }
  goPageNewSearchCriteres() {
    this.router.navigate(["/new-search-criteres"]);
  }
  goPageNewSearchSecteur() {
    this.router.navigate(["/new-search-secteur"]);
  }
  goPageNewSearchZoneGeo() {
    this.router.navigate(["/new-search-zone-geo"]);
  }
  onDrag(ev) {
    // console.log(ev.delta);
    if(ev.delta !== 0)
    this.state= true;
    else
    this.state = false;

  }
  footerExpanded() {
    console.log('Footer expanded!');
    this.state = true;
  }

  footerCollapsed() {
    console.log('Footer collapsed!');
    this.state = false;
  }

  toggleFooter() {
    this.footerState = this.footerState == IonPullUpFooterState.Collapsed ? IonPullUpFooterState.Expanded : IonPullUpFooterState.Collapsed;
  }

}
