import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewSearchSecteurPage } from './new-search-secteur.page';

const routes: Routes = [
  {
    path: '',
    component: NewSearchSecteurPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewSearchSecteurPageRoutingModule {}
