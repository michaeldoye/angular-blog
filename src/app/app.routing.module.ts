import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPageComponent } from './client/pages/login-page/login-page.component';
import { AdminComponent } from './core/admin/admin.component';
import { HomePageComponent } from './client/pages/home-page/home-page.component';
import { DashboardComponent } from './client/admin/dashboard/dashboard.component';
import { PostsComponent } from './client/admin/posts/posts.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        pathMatch: 'full'
      },
      {
        path: 'posts',
        component: PostsComponent,
        pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: []
})
export class RoutingModule { }
