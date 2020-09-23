import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { PopUpDetailPageRoutingModule } from './pop-up-detail-routing.module';
import { PopUpDetailPage } from './pop-up-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PopUpDetailPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [PopUpDetailPage]
})
export class PopUpDetailPageModule {}
