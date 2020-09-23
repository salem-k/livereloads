import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeneralIntroRealisesPageRoutingModule } from './general-intro-realises-routing.module';

import { GeneralIntroRealisesPage } from './general-intro-realises.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeneralIntroRealisesPageRoutingModule
  ],
  declarations: [GeneralIntroRealisesPage]
})
export class GeneralIntroRealisesPageModule {}
