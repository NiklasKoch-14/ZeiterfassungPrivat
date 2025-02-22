import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'stechen',
        loadChildren: () => import('../stecher/stecher.module').then(m => m.StecherPageModule)
      },
      {
        path: 'projektzeiten',
        loadChildren: () => import('../projektzeiten/projektzeiten.module').then(m => m.ProjektzeitenPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/stechen',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/stechen',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
