import { ShareModuleModule } from "./../../components/share-module/share-module.module";

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from "@ionic/angular";

import { PopUpMessageInvitSentPageRoutingModule } from "./pop-up-message-invit-sent-routing.module";
import { PopUpMessageInvitSentPage } from "./pop-up-message-invit-sent.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PopUpMessageInvitSentPageRoutingModule,
    ShareModuleModule,
    TranslateModule.forChild()
  ],
  declarations: [PopUpMessageInvitSentPage]
})
export class PopUpMessageInvitSentPageModule {}
