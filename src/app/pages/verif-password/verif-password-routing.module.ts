import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerifPasswordPage } from './verif-password.page';

const routes: Routes = [
  {
    path: '',
    component: VerifPasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerifPasswordPageRoutingModule {}
