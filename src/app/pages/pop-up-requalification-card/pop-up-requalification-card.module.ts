import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from "@ionic/angular";

import { PopUpRequalificationCardPageRoutingModule } from "./pop-up-requalification-card-routing.module";

import { PopUpRequalificationCardPage } from "./pop-up-requalification-card.page";
import { ShareModuleModule } from "../../components/share-module/share-module.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PopUpRequalificationCardPageRoutingModule,
    ShareModuleModule,
    TranslateModule.forChild()
  ],
  declarations: [PopUpRequalificationCardPage]
})
export class PopUpRequalificationCardPageModule {}
