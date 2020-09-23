import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { ListSollicitationPageRoutingModule } from './list-sollicitation-routing.module';
import { ListSollicitationPage } from './list-sollicitation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListSollicitationPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [ListSollicitationPage]
})
export class ListSollicitationPageModule {}
