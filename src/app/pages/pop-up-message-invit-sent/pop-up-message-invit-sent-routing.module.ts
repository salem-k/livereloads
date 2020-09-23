import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PopUpMessageInvitSentPage } from './pop-up-message-invit-sent.page';

const routes: Routes = [
  {
    path: '',
    component: PopUpMessageInvitSentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PopUpMessageInvitSentPageRoutingModule {}
