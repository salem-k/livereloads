import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlertConnectionPage } from './alert-connection.page';

const routes: Routes = [
  {
    path: '',
    component: AlertConnectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlertConnectionPageRoutingModule {}
