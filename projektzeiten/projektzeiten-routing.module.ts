import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjektzeitenPage } from './projektzeiten.page';

const routes: Routes = [
  {
    path: '',
    component: ProjektzeitenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjektzeitenPageRoutingModule {}
