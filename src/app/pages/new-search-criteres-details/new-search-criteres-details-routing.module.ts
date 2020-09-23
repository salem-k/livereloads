import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewSearchCriteresDetailsPage } from './new-search-criteres-details.page';

const routes: Routes = [
  {
    path: '',
    component: NewSearchCriteresDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewSearchCriteresDetailsPageRoutingModule {}
