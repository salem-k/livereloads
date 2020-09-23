import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PotentielReseauPageRoutingModule } from './potentiel-reseau-routing.module';

import { PotentielReseauPage } from './potentiel-reseau.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PotentielReseauPageRoutingModule
  ],
  declarations: [PotentielReseauPage]
})
export class PotentielReseauPageModule {}
