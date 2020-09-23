import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { AlertConnectionPageRoutingModule } from './alert-connection-routing.module';
import { AlertConnectionPage } from './alert-connection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlertConnectionPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [AlertConnectionPage]
})
export class AlertConnectionPageModule {}
