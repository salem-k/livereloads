import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DataDownloadPage } from './data-download.page';

const routes: Routes = [
  {
    path: '',
    component: DataDownloadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataDownloadPageRoutingModule {}
