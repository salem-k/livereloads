import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InappbrowserPage } from './inappbrowser.page';

const routes: Routes = [
  {
    path: '',
    component: InappbrowserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InappbrowserPageRoutingModule {}
