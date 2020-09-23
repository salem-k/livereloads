import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { DataDownloadPageRoutingModule } from './data-download-routing.module';
import { DataDownloadPage } from './data-download.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DataDownloadPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [DataDownloadPage]
})
export class DataDownloadPageModule {}
