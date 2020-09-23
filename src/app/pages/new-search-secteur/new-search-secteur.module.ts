import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewSearchSecteurPageRoutingModule } from './new-search-secteur-routing.module';

import { NewSearchSecteurPage } from './new-search-secteur.page';
import { AutoCompleteModule } from 'ionic4-auto-complete';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewSearchSecteurPageRoutingModule,
    AutoCompleteModule
  ],
  declarations: [NewSearchSecteurPage]
})
export class NewSearchSecteurPageModule {}
