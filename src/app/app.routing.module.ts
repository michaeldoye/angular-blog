import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPageComponent } from './client/pages/login-page/login-page.component';
import { AdminComponent } from './core/admin/admin.component';
import { HomePageComponent } from './client/pages/home-page/home-page.component';
import { DashboardComponent } from './client/admin/dashboard/dashboard.component';
import { PostsComponent } from './client/admin/posts/posts.component';
import { AdminAuthGuard } from './client/utils/admin-auth.gaurd';
import { AddPostComponent } from './client/admin/posts/add-post/add-post.component';
import { EditPostComponent } from './client/admin/posts/edit-post/edit-post.component';
import { SinglePostComponent } from './client/pages/single-post/single-post.component';
import { FrontendComponent } from './core/frontend/frontend.component';

const routes: Routes = [
  {
    path: '',
    component: FrontendComponent,
    children: [
      {
        path: '',
        component: HomePageComponent
      },
      {
        path: 'post/:id/:title',
        component: SinglePostComponent
      },
    ]
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminAuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
        pathMatch: 'full'
      },
      {
        path: 'posts',
        component: PostsComponent,
      },
      {
        path: 'posts/edit/:id',
        component: EditPostComponent,
      },
      {
        path: 'posts/new',
        component: AddPostComponent,
        pathMatch: 'full'
      }   
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: []
})
export class RoutingModule { }
