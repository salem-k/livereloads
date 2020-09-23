import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditSearchPage } from './edit-search.page';

const routes: Routes = [
  {
    path: '',
    component: EditSearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditSearchPageRoutingModule {}
