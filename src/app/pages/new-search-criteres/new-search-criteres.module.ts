import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { NewSearchCriteresPageRoutingModule } from './new-search-criteres-routing.module';
import { NewSearchCriteresPage } from './new-search-criteres.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewSearchCriteresPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [NewSearchCriteresPage]
})
export class NewSearchCriteresPageModule {}
