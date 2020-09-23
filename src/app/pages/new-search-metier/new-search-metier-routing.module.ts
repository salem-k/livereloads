import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewSearchMetierPage } from './new-search-metier.page';

const routes: Routes = [
  {
    path: '',
    component: NewSearchMetierPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewSearchMetierPageRoutingModule {}
