import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GetDataFromLinkedInPage } from './get-data-from-linked-in.page';

const routes: Routes = [
  {
    path: '',
    component: GetDataFromLinkedInPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GetDataFromLinkedInPageRoutingModule {}
