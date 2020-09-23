import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { PopUpInvitPageRoutingModule } from './pop-up-invit-routing.module';
import { PopUpInvitPage } from './pop-up-invit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PopUpInvitPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [PopUpInvitPage]
})
export class PopUpInvitPageModule {}
