import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginPage1PageRoutingModule } from './login-page1-routing.module';
import { LoginPage1Page } from './login-page1.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPage1PageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [LoginPage1Page]
})
export class LoginPage1PageModule {}
