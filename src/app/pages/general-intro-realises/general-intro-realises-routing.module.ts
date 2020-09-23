import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneralIntroRealisesPage } from './general-intro-realises.page';

const routes: Routes = [
  {
    path: '',
    component: GeneralIntroRealisesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneralIntroRealisesPageRoutingModule {}
