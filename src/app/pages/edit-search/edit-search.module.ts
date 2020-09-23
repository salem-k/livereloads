import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditSearchPageRoutingModule } from './edit-search-routing.module';

import { EditSearchPage } from './edit-search.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditSearchPageRoutingModule
  ],
  declarations: [EditSearchPage]
})
export class EditSearchPageModule {}
