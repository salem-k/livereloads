import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { NewSearchMetierPageRoutingModule } from './new-search-metier-routing.module';
import { NewSearchMetierPage } from './new-search-metier.page';
import { AutoCompleteModule } from 'ionic4-auto-complete';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewSearchMetierPageRoutingModule,
    TranslateModule.forChild(),
    AutoCompleteModule
  ],
  declarations: [NewSearchMetierPage]
})
export class NewSearchMetierPageModule {}
