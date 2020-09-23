import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { SecurityAndConnectionPageRoutingModule } from './security-and-connection-routing.module';
import { SecurityAndConnectionPage } from './security-and-connection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SecurityAndConnectionPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [SecurityAndConnectionPage]
})
export class SecurityAndConnectionPageModule {}
