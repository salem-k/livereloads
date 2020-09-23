import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmailPagePage } from './email-page.page';

const routes: Routes = [
  {
    path: '',
    component: EmailPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmailPagePageRoutingModule {}
