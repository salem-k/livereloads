import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpportunityPageRoutingModule } from './opportunity-routing.module';

import { OpportunityPage } from './opportunity.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OpportunityPageRoutingModule
  ],
  declarations: [OpportunityPage]
})
export class OpportunityPageModule {}
