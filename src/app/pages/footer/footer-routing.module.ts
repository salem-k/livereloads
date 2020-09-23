import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FooterPage } from './footer.page';

const routes: Routes = [
  {
    path: '',
    component: FooterPage,
    children: [
      {
        path: 'searchTab1',
        loadChildren: () => import('../search-tab1/search-tab1.module').then(m => m.SearchTab1PageModule)
      },
      {
        path: 'synchTab2',
        loadChildren: () => import('../synch-tab2/synch-tab2.module').then(m => m.SynchTab2PageModule)
      },
      {
        path: 'profilTab3',
        loadChildren: () => import('../profil-tab3/profil-tab3.module').then(m => m.ProfilTab3PageModule)
      },
      {
        path: 'footer',
        redirectTo: '/footer/searchTab1',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FooterPageRoutingModule {}
