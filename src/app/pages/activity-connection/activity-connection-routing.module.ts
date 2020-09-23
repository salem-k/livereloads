import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActivityConnectionPage } from './activity-connection.page';

const routes: Routes = [
  {
    path: '',
    component: ActivityConnectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActivityConnectionPageRoutingModule {}
