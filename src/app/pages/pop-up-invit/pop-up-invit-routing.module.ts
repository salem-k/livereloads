import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PopUpInvitPage } from './pop-up-invit.page';

const routes: Routes = [
  {
    path: '',
    component: PopUpInvitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PopUpInvitPageRoutingModule {}
