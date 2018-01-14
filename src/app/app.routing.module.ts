import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './client/pages/login-page/login-page.component';
import { AdminComponent } from './core/admin/admin.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: '',
    component: AdminComponent,}
  //   children: [
  //     {
  //       path: '',
  //       component: UserDashBoardComponent,
  //       pathMatch: 'full'
  //     },
  //     {
  //       path: 'keyword-rankings',
  //       component: KeywordsComponent
  //     },
  //     {
  //       path: 'traffic',
  //       component: TrafficReportComponent
  //     },
  //     {
  //       path: 'traffic/adwords',
  //       component: AdwordsComponent
  //     },
  //     {
  //       path: 'traffic/goals',
  //       component: GoalsComponent
  //     },      
  //     {
  //       path: 'time-report',
  //       component: TimeReportComponent
  //     },
  //     {
  //       path: 'social',
  //       component: SocialMediaComponent
  //     },      
  //     {
  //       path: 'messages',
  //       component: TwInboxComponent
  //     },     
  //     {
  //       path: 'user-manager',
  //       component: UserManagerComponent,
  //       canActivate: [ AdminAuthGuard ],
  //     },
  //     {
  //       path: 'profile',
  //       component: UserProfileComponent
  //     },  
  //   ]
  // }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: []
})
export class RoutingModule { }
