import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { EmailPagePageRoutingModule } from './email-page-routing.module';
import { EmailPagePage } from './email-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmailPagePageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [EmailPagePage]
})
export class EmailPagePageModule {}
