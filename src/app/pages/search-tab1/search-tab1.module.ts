import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { SearchTab1PageRoutingModule } from './search-tab1-routing.module';
import { SearchTab1Page } from './search-tab1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchTab1PageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [SearchTab1Page]
})
export class SearchTab1PageModule {}
