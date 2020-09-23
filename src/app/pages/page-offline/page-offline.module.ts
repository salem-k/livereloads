import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { PageOfflinePageRoutingModule } from './page-offline-routing.module';
import { PageOfflinePage } from './page-offline.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageOfflinePageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [PageOfflinePage]
})
export class PageOfflinePageModule {}
