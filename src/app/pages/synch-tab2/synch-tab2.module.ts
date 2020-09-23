import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from "@ionic/angular";

import { ShareModuleModule } from "../../components/share-module/share-module.module";
import { SynchTab2PageRoutingModule } from "./synch-tab2-routing.module";
import { SynchTab2Page } from "./synch-tab2.page";
import { SwingModule } from 'angular2-swing';
import { SharedModule } from 'src/app/components/shared-module/shared-module.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SynchTab2PageRoutingModule,
    ShareModuleModule,
    SwingModule,
    SharedModule,
    TranslateModule.forChild()
  ],
  declarations: [SynchTab2Page],
  entryComponents: []
})
export class SynchTab2PageModule {}
