import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewSearch2Page } from './new-search2.page';

const routes: Routes = [
  {
    path: '',
    component: NewSearch2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewSearch2PageRoutingModule {}
