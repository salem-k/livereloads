import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificationsPushPage } from './notifications-push.page';

const routes: Routes = [
  {
    path: '',
    component: NotificationsPushPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationsPushPageRoutingModule {}
