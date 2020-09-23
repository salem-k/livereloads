import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage1Page } from './login-page1.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPage1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPage1PageRoutingModule {}
