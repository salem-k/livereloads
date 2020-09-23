import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { ProfilTab3PageRoutingModule } from './profil-tab3-routing.module';
import { ProfilTab3Page } from './profil-tab3.page';
import { ShareModuleProfilModule } from 'src/app/components/share-module/share-module-profil.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilTab3PageRoutingModule,
    ShareModuleProfilModule,
    TranslateModule.forChild()
  ],
  declarations: [ProfilTab3Page]
})
export class ProfilTab3PageModule {}
