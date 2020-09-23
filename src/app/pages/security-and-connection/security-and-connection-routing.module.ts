import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SecurityAndConnectionPage } from './security-and-connection.page';

const routes: Routes = [
  {
    path: '',
    component: SecurityAndConnectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecurityAndConnectionPageRoutingModule {}
