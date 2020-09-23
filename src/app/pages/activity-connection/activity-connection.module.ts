import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { ActivityConnectionPageRoutingModule } from './activity-connection-routing.module';
import { ActivityConnectionPage } from './activity-connection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActivityConnectionPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [ActivityConnectionPage]
})
export class ActivityConnectionPageModule {}
