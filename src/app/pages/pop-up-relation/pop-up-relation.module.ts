import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { PopUpRelationPageRoutingModule } from './pop-up-relation-routing.module';
import { PopUpRelationPage } from './pop-up-relation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PopUpRelationPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [PopUpRelationPage]
})
export class PopUpRelationPageModule {}
