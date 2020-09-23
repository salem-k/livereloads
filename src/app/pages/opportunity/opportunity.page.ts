import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { SearchService } from 'src/app/providers/search/search.service';
import { NetworkService } from "../../providers/salesfriends/network/network.service";
import { SharedDataService } from "../../providers/shared-data/shared-data.service";

@Component({
  selector: "app-opportunity",
  templateUrl: "./opportunity.page.html",
  styleUrls: ["./opportunity.page.scss"]
})
export class OpportunityPage implements OnInit {
  focused: boolean = false;
  networks: any = [];

  invitations: any = [];
  idSearch
  constructor(
    public location: Location,
    private networkService: NetworkService,
    private sharedData: SharedDataService,
    private activatedRoute: ActivatedRoute,
    private searchService: SearchService,
  ) {}

  async ionViewWillEnter(){
    this.idSearch = this.activatedRoute.snapshot.paramMap.get('id');
    await this.sharedData.showLoading()
    this.searchService.getSearchById(this.idSearch).subscribe(async (data:any)=>{
      await this.sharedData.hideLoading()
      console.log("DATA SEARCH",data);
      

    },async error=>{
      alert(JSON.stringify(error))
      await this.sharedData.hideLoading()
    })
    
    let amis = JSON.parse(localStorage.getItem("search."+this.idSearch+".processed_data"))
    let networks = JSON.parse(localStorage.getItem("myNetwork"))
    
    console.log("amis",amis);
    let result = []
    for(var item in amis) {
      console.log(amis[item].num_relations);
      console.log("item",item);
      result.concat(networks.filter((element)=>{
          console.log(item," == ",element.public_identifier);
          
          return item == element.public_identifier
      })) 
    }

    console.log("amis",amis);
    
    
    console.log("RESULT",result);
    
    
    
  }
  ngOnInit() {
    

    this.networkService.getNetwork().subscribe(async networks => {
      this.networks = networks;
      console.log(networks);
      this.networks = this.networks.filter(e => e.solicitable == true);

      // await this.sharedData.hideLoading();
      this.invitations = this.sharedData.getMessageInvitation();
      console.log(this.sharedData.getMessageInvitationSended());
      let data=this.sharedData.getMessageInvitationSended();
      this.invitations=this.invitations.concat(data);
      console.log(this.invitations)
    });
  }

  onFocus() {
    this.focused = true;
  }
  onBlur() {
    this.focused = false;
  }
  goBack() {
    this.location.back();
  }
}
