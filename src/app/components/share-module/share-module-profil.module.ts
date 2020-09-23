import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParamComponent } from '../param/param.component';
import { NotifComponent } from '../notif/notif.component';
import { ListeAmisComponent } from '../liste-amis/liste-amis.component';
import { InvitationsComponent } from '../invitations/invitations.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    ParamComponent,
    NotifComponent,
    ListeAmisComponent,
    InvitationsComponent
  ],
  imports: [
    IonicModule, CommonModule, FormsModule, TranslateModule.forChild()
  ],
  exports: [
    ParamComponent,
    NotifComponent,
    ListeAmisComponent,
    InvitationsComponent
  ]
})
export class ShareModuleProfilModule { }
