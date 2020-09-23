import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SynchTab2Page } from './synch-tab2.page';

const routes: Routes = [
  {
    path: '',
    component: SynchTab2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SynchTab2PageRoutingModule {}
