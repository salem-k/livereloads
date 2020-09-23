import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SwipeCardComponent } from '../swipe-card/swipe-card.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild()
  ],
  declarations: [
    SwipeCardComponent,
  ],
  providers: [],
  exports: [
    SwipeCardComponent,
  ]
})

export class SharedModule {}
