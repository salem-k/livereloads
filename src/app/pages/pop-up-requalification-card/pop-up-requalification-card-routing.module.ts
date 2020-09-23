import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PopUpRequalificationCardPage } from './pop-up-requalification-card.page';

const routes: Routes = [
  {
    path: '',
    component: PopUpRequalificationCardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PopUpRequalificationCardPageRoutingModule {}
