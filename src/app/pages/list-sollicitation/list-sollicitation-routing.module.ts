import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListSollicitationPage } from './list-sollicitation.page';

const routes: Routes = [
  {
    path: '',
    component: ListSollicitationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListSollicitationPageRoutingModule {}
