import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewSearchZoneGeoPage } from './new-search-zone-geo.page';

const routes: Routes = [
  {
    path: '',
    component: NewSearchZoneGeoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewSearchZoneGeoPageRoutingModule {}
