import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { CardPageComponent } from "../card-page/card-page.component";
import { FinListComponent } from "../fin-list/fin-list.component";
import { FriendsSearchComponent } from "../friends-search/friends-search.component";
import { HistoryComponent } from "../history/history.component";
import { MatchingDispoComponent } from "../matching-dispo/matching-dispo.component";
import { OnBoardingIntroductionComponent } from "../on-boarding-introduction/on-boarding-introduction.component";
import { PopUpNotificationComponent } from "../pop-up-notification/pop-up-notification.component";
import { SharedModule } from "../shared-module/shared-module.module";
import { SynchPageComponent } from "../synch-page/synch-page.component";
import { OnBoardingDeclineComponent } from "./../on-boarding-decline/on-boarding-decline.component";
import { OnBoardingShakerFeedbackComponent } from "./../on-boarding-shaker-feedback/on-boarding-shaker-feedback.component";

@NgModule({
  declarations: [
    CardPageComponent,
    FinListComponent,
    PopUpNotificationComponent,

    FriendsSearchComponent,
    HistoryComponent,
    MatchingDispoComponent,
    OnBoardingDeclineComponent,
    OnBoardingIntroductionComponent,
    OnBoardingShakerFeedbackComponent,
    SynchPageComponent
  ],

  exports: [
    CardPageComponent,
    FinListComponent,
    PopUpNotificationComponent,

    FriendsSearchComponent,
    HistoryComponent,
    MatchingDispoComponent,
    OnBoardingDeclineComponent,
    OnBoardingIntroductionComponent,
    OnBoardingShakerFeedbackComponent,
    SynchPageComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SharedModule,
    TranslateModule.forChild()
  ]
})
export class ShareModuleModule {}
