import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewSearch2PageRoutingModule } from './new-search2-routing.module';

import { NewSearch2Page } from './new-search2.page';
import { IonicPullupModule } from 'ionic-pullup';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewSearch2PageRoutingModule,
    IonicPullupModule
  ],
  declarations: [NewSearch2Page]
})
export class NewSearch2PageModule {}
