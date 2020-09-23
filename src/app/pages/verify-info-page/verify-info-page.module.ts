import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { VerifyInfoPagePageRoutingModule } from './verify-info-page-routing.module';
import { VerifyInfoPagePage } from './verify-info-page.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerifyInfoPagePageRoutingModule,
    ReactiveFormsModule,
    TranslateModule.forChild()
  ],
  declarations: [VerifyInfoPagePage]
})
export class VerifyInfoPagePageModule {}
