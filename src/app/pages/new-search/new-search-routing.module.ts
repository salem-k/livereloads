import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewSearchPage } from './new-search.page';

const routes: Routes = [
  {
    path: '',
    component: NewSearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewSearchPageRoutingModule {}
