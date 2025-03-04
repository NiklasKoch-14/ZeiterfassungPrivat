import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import {authGuard} from "../services/auth.guard";

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    canActivate: [authGuard],
    children: [
      {
        path: 'stechen',
        loadChildren: () => import('../stecher/stecher.module').then(m => m.StecherPageModule),
      },
      {
        path: 'projektzeiten',
        loadChildren: () => import('../projektzeiten/projektzeiten.module').then(m => m.ProjektzeitenPageModule),
      },
      {
        path: '',
        redirectTo: 'signup',
        pathMatch: 'full',
      },
    ]
  },
  {
    path: 'signup',
    loadComponent: () => import('../signup/signup.page').then(m => m.SignupPage),
  },
  {
    path: 'login',
    loadComponent: () => import('../login/login.page').then(m => m.LoginPage),
  },
  {
    path: '',
    redirectTo: 'tabs/stechen',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
