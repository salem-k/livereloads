import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchTab1Page } from './search-tab1.page';

const routes: Routes = [
  {
    path: '',
    component: SearchTab1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchTab1PageRoutingModule {}
