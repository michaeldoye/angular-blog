import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MatSnackBar } from "@angular/material";
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()
export class AdminAuthGuard implements CanActivate {

  activeUser: any = this.ls.get('user');

  constructor(
    private ls: LocalStorageService,
    private rt: Router,
    private sb: MatSnackBar
  ) {}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean { 
      if(this.activeUser && this.activeUser.uid === 'FbD7xNni6Xe1eF0k8AIUMVOLkFH2') {
        return true;
      } 
      else {
        this.sb.open('You do not have permission to access this page', '', {duration: 5000});
        this.rt.navigate(['/']);
        return false;
      }
  }
}
