import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ProjektzeitenPageRoutingModule } from './projektzeiten-routing.module';

import { ProjektzeitenPage } from './projektzeiten.page';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: '',
    component: ProjektzeitenPage,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    IonicModule,
    ProjektzeitenPageRoutingModule
  ],
  exports: [RouterModule],
  declarations: [ProjektzeitenPage]
})
export class ProjektzeitenPageModule {}
