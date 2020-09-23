import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IntroRealisesPageRoutingModule } from './intro-realises-routing.module';

import { IntroRealisesPage } from './intro-realises.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IntroRealisesPageRoutingModule
  ],
  declarations: [IntroRealisesPage]
})
export class IntroRealisesPageModule {}
