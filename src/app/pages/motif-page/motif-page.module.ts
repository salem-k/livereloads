import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { MotifPagePageRoutingModule } from './motif-page-routing.module';
import { MotifPagePage } from './motif-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MotifPagePageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [MotifPagePage]
})
export class MotifPagePageModule {}
