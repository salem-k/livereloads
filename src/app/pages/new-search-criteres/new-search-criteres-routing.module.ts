import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewSearchCriteresPage } from './new-search-criteres.page';

const routes: Routes = [
  {
    path: '',
    component: NewSearchCriteresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewSearchCriteresPageRoutingModule {}
