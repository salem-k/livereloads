import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { GetDataFromLinkedInPageRoutingModule } from './get-data-from-linked-in-routing.module';
import { GetDataFromLinkedInPage } from './get-data-from-linked-in.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GetDataFromLinkedInPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [GetDataFromLinkedInPage]
})
export class GetDataFromLinkedInPageModule {}
