import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpinnerPagePage } from './spinner-page.page';

const routes: Routes = [
  {
    path: '',
    component: SpinnerPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpinnerPagePageRoutingModule {}
