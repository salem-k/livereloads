import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InappbrowserPageRoutingModule } from './inappbrowser-routing.module';

import { InappbrowserPage } from './inappbrowser.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InappbrowserPageRoutingModule
  ],
  declarations: [InappbrowserPage]
})
export class InappbrowserPageModule {}
