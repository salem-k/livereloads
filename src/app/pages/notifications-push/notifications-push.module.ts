import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { NotificationsPushPageRoutingModule } from './notifications-push-routing.module';
import { NotificationsPushPage } from './notifications-push.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationsPushPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [NotificationsPushPage]
})
export class NotificationsPushPageModule {}
