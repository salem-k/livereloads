import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewSearchZoneGeoPageRoutingModule } from './new-search-zone-geo-routing.module';

import { NewSearchZoneGeoPage } from './new-search-zone-geo.page';
import { AutoCompleteModule } from 'ionic4-auto-complete';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewSearchZoneGeoPageRoutingModule,
    AutoCompleteModule,

  ],
  declarations: [NewSearchZoneGeoPage]
})
export class NewSearchZoneGeoPageModule {}
