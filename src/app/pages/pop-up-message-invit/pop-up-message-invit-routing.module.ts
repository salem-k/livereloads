import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PopUpMessageInvitPage } from './pop-up-message-invit.page';

const routes: Routes = [
  {
    path: '',
    component: PopUpMessageInvitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PopUpMessageInvitPageRoutingModule {}
