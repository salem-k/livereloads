import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { SpinnerPagePageRoutingModule } from './spinner-page-routing.module';
import { SpinnerPagePage } from './spinner-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpinnerPagePageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [SpinnerPagePage]
})
export class SpinnerPagePageModule {}
