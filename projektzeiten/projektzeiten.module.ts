import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ProjektzeitenPageRoutingModule } from './projektzeiten-routing.module';

import { ProjektzeitenPage } from './projektzeiten.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProjektzeitenPageRoutingModule
  ],
  declarations: [ProjektzeitenPage]
})
export class ProjektzeitenPageModule {}
