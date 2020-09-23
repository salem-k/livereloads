import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerifyInfoPagePage } from './verify-info-page.page';

const routes: Routes = [
  {
    path: '',
    component: VerifyInfoPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerifyInfoPagePageRoutingModule {}
