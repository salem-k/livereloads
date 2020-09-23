import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { SynchLinkedInPagePageRoutingModule } from "./synch-linked-in-page-routing.module";
import { SynchLinkedInPagePage } from "./synch-linked-in-page.page";
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    SynchLinkedInPagePageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [SynchLinkedInPagePage]
})
export class SynchLinkedInPagePageModule {}
