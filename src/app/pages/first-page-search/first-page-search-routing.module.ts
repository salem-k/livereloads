import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FirstPageSearchPage } from './first-page-search.page';

const routes: Routes = [
  {
    path: '',
    component: FirstPageSearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FirstPageSearchPageRoutingModule {}
