import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { UserService } from "../../providers/user-service/user.service";
import { LoginPagePageRoutingModule } from "./login-page-routing.module";
import { LoginPagePage } from "./login-page.page";
import { ShareModuleModule } from '../../components/share-module/share-module.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPagePageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ShareModuleModule,
    TranslateModule.forChild()
  ],
  declarations: [LoginPagePage],
  providers: [UserService]
})
export class LoginPagePageModule {}
