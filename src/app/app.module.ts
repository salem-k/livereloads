import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS
} from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
import { BackgroundMode } from "@ionic-native/background-mode/ngx";
import { Device } from "@ionic-native/device/ngx";
import { FCM } from "@ionic-native/fcm/ngx";
import { HTTP } from "@ionic-native/http/ngx";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { Keyboard } from "@ionic-native/keyboard/ngx";
import { Network } from "@ionic-native/network/ngx";
import { Shake } from "@ionic-native/shake/ngx";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ValiderCguComponent } from "./pages/signUp/valider-cgu/valider-cgu.component";
import { LinkedinServiceService } from "./providers/linkedin-service/linkedin-service.service";
import { NetworkService } from "./providers/salesfriends/network/network.service";
import { SharedDataService } from "./providers/shared-data/shared-data.service";
import { UserService } from "./providers/user-service/user.service";
import { BasicAuthInterceptor } from "./_helpers/basic-auth.interceptor";
import { AutoCompleteModule } from 'ionic4-auto-complete';
import { AutoCompleteRegions } from './providers/linkedin-service/autoCompleteRegions';
import { AutoCompleteMetiers } from './providers/linkedin-service/autoCompleteMetiers';
import { AutoCompleteSectors } from './providers/linkedin-service/autoCompleteSectors';

/* Custom http loader for ngx-translate to specify base folder for
 * language files
 */
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

/* NgModule definition */
@NgModule({
  declarations: [AppComponent, ValiderCguComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot({
      swipeBackEnabled: false
    }),
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    AutoCompleteModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HTTP,
    InAppBrowser,
    UserService,
    SharedDataService,
    LinkedinServiceService,
    Network,
    Keyboard,
    Shake,
    Device,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    NetworkService,
    FCM,
    BackgroundMode,
    AutoCompleteRegions,
    AutoCompleteMetiers,
    AutoCompleteSectors
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
