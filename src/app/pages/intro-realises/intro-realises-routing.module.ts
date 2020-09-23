import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IntroRealisesPage } from './intro-realises.page';

const routes: Routes = [
  {
    path: '',
    component: IntroRealisesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IntroRealisesPageRoutingModule {}
