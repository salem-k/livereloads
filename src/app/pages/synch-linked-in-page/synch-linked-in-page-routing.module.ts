import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SynchLinkedInPagePage } from './synch-linked-in-page.page';

const routes: Routes = [
  {
    path: '',
    component: SynchLinkedInPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SynchLinkedInPagePageRoutingModule {}
