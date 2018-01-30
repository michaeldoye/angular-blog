import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { LocalStorageModule } from 'angular-2-local-storage';

import { MaterialModule } from '../../material.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SinglePostComponent } from './single-post/single-post.component';

@NgModule({
  declarations: [
    LoginPageComponent, 
    HomePageComponent, 
    SinglePostComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    LocalStorageModule.withConfig({
      storageType: 'localStorage'
    })    
  ],
  entryComponents: [],
  providers: [AngularFireDatabase]
})
export class PagesModule { }
