import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilTab3Page } from './profil-tab3.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilTab3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilTab3PageRoutingModule {}
