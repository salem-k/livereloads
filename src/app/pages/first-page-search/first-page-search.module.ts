import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FirstPageSearchPageRoutingModule } from './first-page-search-routing.module';

import { FirstPageSearchPage } from './first-page-search.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FirstPageSearchPageRoutingModule
  ],
  declarations: [FirstPageSearchPage]
})
export class FirstPageSearchPageModule {}
