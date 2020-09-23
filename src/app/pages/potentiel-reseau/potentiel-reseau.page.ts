import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../../providers/salesfriends/network/network.service';

@Component({
  selector: 'app-potentiel-reseau',
  templateUrl: './potentiel-reseau.page.html',
  styleUrls: ['./potentiel-reseau.page.scss'],
})
export class PotentielReseauPage implements OnInit {
  focused: boolean = false;
  networks: any;
  constructor(public location: Location,private networkService: NetworkService) { }

  ngOnInit() {
    this.networkService.getNetwork().subscribe(async networks=>{
      console.log(networks);
      this.networks = networks;


    })
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
