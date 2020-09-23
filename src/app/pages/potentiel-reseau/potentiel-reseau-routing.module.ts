import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PotentielReseauPage } from './potentiel-reseau.page';

const routes: Routes = [
  {
    path: '',
    component: PotentielReseauPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PotentielReseauPageRoutingModule {}
