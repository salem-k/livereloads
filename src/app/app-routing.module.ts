import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { ValiderCguComponent } from "./pages/signUp/valider-cgu/valider-cgu.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "login-page1",
    pathMatch: "full"
  },
  {
    path: "login-page",
    loadChildren: () =>
      import("./pages/login-page/login-page.module").then(
        m => m.LoginPagePageModule
      )
  },
  {
    path: "synch-linked-in-page",
    loadChildren: () =>
      import("./pages/synch-linked-in-page/synch-linked-in-page.module").then(
        m => m.SynchLinkedInPagePageModule
      )
  },
  {
    path: "verify-info-page",
    loadChildren: () =>
      import("./pages/verify-info-page/verify-info-page.module").then(
        m => m.VerifyInfoPagePageModule
      )
  },
  {
    path: "valider-cgu",
    component: ValiderCguComponent
  },
  {
    path: "list-sollicitation",
    loadChildren: () =>
      import("./pages/list-sollicitation/list-sollicitation.module").then(
        m => m.ListSollicitationPageModule
      )
  },
  // {
  //   path: 'tabs',
  //   loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  // },
  {
    path: "page-offline",
    loadChildren: () =>
      import("./pages/page-offline/page-offline.module").then(
        m => m.PageOfflinePageModule
      )
  },
  {
    path: "pop-up-relation",
    loadChildren: () =>
      import("./pages/pop-up-relation/pop-up-relation.module").then(
        m => m.PopUpRelationPageModule
      )
  },
  {
    path: "pop-up-message-invit",
    loadChildren: () =>
      import("./pages/pop-up-message-invit/pop-up-message-invit.module").then(
        m => m.PopUpMessageInvitPageModule
      )
  },
  {
    path: "pop-up-message-invit-sent",
    loadChildren: () =>
      import(
        "./pages/pop-up-message-invit-sent/pop-up-message-invit-sent.module"
      ).then(m => m.PopUpMessageInvitSentPageModule)
  },
  {
    path: "pop-up-requalification-card",
    loadChildren: () =>
      import(
        "./pages/pop-up-requalification-card/pop-up-requalification-card.module"
      ).then(m => m.PopUpRequalificationCardPageModule)
  },
  {
    path: "motif-page",
    loadChildren: () =>
      import("./pages/motif-page/motif-page.module").then(
        m => m.MotifPagePageModule
      )
  },
  {
    path: "pop-up-detail",
    loadChildren: () =>
      import("./pages/pop-up-detail/pop-up-detail.module").then(
        m => m.PopUpDetailPageModule
      )
  },
  {
    path: "profil-tab3",
    loadChildren: () =>
      import("./pages/profil-tab3/profil-tab3.module").then(
        m => m.ProfilTab3PageModule
      )
  },
  {
    path: "synch-tab2",
    loadChildren: () =>
      import("./pages/synch-tab2/synch-tab2.module").then(
        m => m.SynchTab2PageModule
      )
  },
  {
    path: "search-tab1",
    loadChildren: () =>
      import("./pages/search-tab1/search-tab1.module").then(
        m => m.SearchTab1PageModule
      )
  },
  {
    path: "footer",
    loadChildren: () =>
      import("./pages/footer/footer.module").then(m => m.FooterPageModule)
  },
  {
    path: 'login-page1',
    loadChildren: () => import('./pages/login-page1/login-page1.module').then( m => m.LoginPage1PageModule)
  },
  {
    path: 'verif-password',
    loadChildren: () => import('./pages/verif-password/verif-password.module').then( m => m.VerifPasswordPageModule)
  },
  {
    path: 'inappbrowser',
    loadChildren: () => import('./pages/inappbrowser/inappbrowser.module').then( m => m.InappbrowserPageModule)
  },
  {
    path: 'get-data-from-linked-in/:email/:password',
    loadChildren: () => import('./pages/get-data-from-linked-in/get-data-from-linked-in.module').then( m => m.GetDataFromLinkedInPageModule)
  },
  {
    path: 'spinner-page',
    loadChildren: () => import('./pages/spinner-page/spinner-page.module').then( m => m.SpinnerPagePageModule)
  },
  {
    path: 'pop-up-invit',
    loadChildren: () => import('./pages/pop-up-invit/pop-up-invit.module').then( m => m.PopUpInvitPageModule)
  },
  {
    path: 'new-search',
    loadChildren: () => import('./pages/new-search/new-search.module').then( m => m.NewSearchPageModule)
  },
  {
    path: 'new-search-metier',
    loadChildren: () => import('./pages/new-search-metier/new-search-metier.module').then( m => m.NewSearchMetierPageModule)
  },
  {
    path: 'new-search-criteres',
    loadChildren: () => import('./pages/new-search-criteres/new-search-criteres.module').then( m => m.NewSearchCriteresPageModule)
  },
  {
    path: 'new-search-criteres-details',
    loadChildren: () => import('./pages/new-search-criteres-details/new-search-criteres-details.module').then( m => m.NewSearchCriteresDetailsPageModule)
  },
  {
    path: 'notifications-push',
    loadChildren: () => import('./pages/notifications-push/notifications-push.module').then( m => m.NotificationsPushPageModule)
  },
  {
    path: 'email-page',
    loadChildren: () => import('./pages/email-page/email-page.module').then( m => m.EmailPagePageModule)
  },
  {
    path: 'security-and-connection',
    loadChildren: () => import('./pages/security-and-connection/security-and-connection.module').then( m => m.SecurityAndConnectionPageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./pages/change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  },
  {
    path: 'alert-connection',
    loadChildren: () => import('./pages/alert-connection/alert-connection.module').then( m => m.AlertConnectionPageModule)
  },
  {
    path: 'activity-connection',
    loadChildren: () => import('./pages/activity-connection/activity-connection.module').then( m => m.ActivityConnectionPageModule)
  },
  {
    path: 'data-download',
    loadChildren: () => import('./pages/data-download/data-download.module').then( m => m.DataDownloadPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'new-search-secteur',
    loadChildren: () => import('./pages/new-search-secteur/new-search-secteur.module').then( m => m.NewSearchSecteurPageModule)
  },
  {
    path: 'new-search-zone-geo',
    loadChildren: () => import('./pages/new-search-zone-geo/new-search-zone-geo.module').then( m => m.NewSearchZoneGeoPageModule)
  },
  {
    path: 'first-page-search',
    loadChildren: () => import('./pages/first-page-search/first-page-search.module').then( m => m.FirstPageSearchPageModule)
  },
  {
    path: 'new-search2',
    loadChildren: () => import('./pages/new-search2/new-search2.module').then( m => m.NewSearch2PageModule)
  },
  {
    path: 'edit-search/:id',
    loadChildren: () => import('./pages/edit-search/edit-search.module').then( m => m.EditSearchPageModule)
  },
  {
    path: 'opportunity/:id',
    loadChildren: () => import('./pages/opportunity/opportunity.module').then( m => m.OpportunityPageModule)
  },
  {
    path: 'potentiel-reseau/:id',
    loadChildren: () => import('./pages/potentiel-reseau/potentiel-reseau.module').then( m => m.PotentielReseauPageModule)
  },
  {
    path: 'intro-realises',
    loadChildren: () => import('./pages/intro-realises/intro-realises.module').then( m => m.IntroRealisesPageModule)
  },
  {
    path: 'general-intro-realises',
    loadChildren: () => import('./pages/general-intro-realises/general-intro-realises.module').then( m => m.GeneralIntroRealisesPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
