import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { PopUpMessageInvitPageRoutingModule } from './pop-up-message-invit-routing.module';
import { PopUpMessageInvitPage } from './pop-up-message-invit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PopUpMessageInvitPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [PopUpMessageInvitPage]
})
export class PopUpMessageInvitPageModule {}
