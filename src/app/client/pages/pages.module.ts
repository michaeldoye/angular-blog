import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../../material.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';

@NgModule({
  declarations: [LoginPageComponent, HomePageComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  entryComponents: [],
  providers: []
})
export class PagesModule { }