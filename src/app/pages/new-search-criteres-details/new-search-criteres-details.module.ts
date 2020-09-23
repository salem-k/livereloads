import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { NewSearchCriteresDetailsPageRoutingModule } from './new-search-criteres-details-routing.module';
import { NewSearchCriteresDetailsPage } from './new-search-criteres-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewSearchCriteresDetailsPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [NewSearchCriteresDetailsPage]
})
export class NewSearchCriteresDetailsPageModule {}
