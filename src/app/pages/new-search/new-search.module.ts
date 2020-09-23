import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { NewSearchPageRoutingModule } from "./new-search-routing.module";
import { NewSearchPage } from "./new-search.page";
import { IonicPullupModule } from 'ionic-pullup';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewSearchPageRoutingModule,
    TranslateModule.forChild(),
    IonicPullupModule
  ],
  declarations: [NewSearchPage]
})
export class NewSearchPageModule {}
