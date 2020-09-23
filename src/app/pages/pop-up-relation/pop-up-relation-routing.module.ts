import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PopUpRelationPage } from './pop-up-relation.page';

const routes: Routes = [
  {
    path: '',
    component: PopUpRelationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PopUpRelationPageRoutingModule {}
