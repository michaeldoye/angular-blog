import { Component, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  //encapsulation: ViewEncapsulation.None  
})
export class AdminComponent {

  isDarkTheme: boolean = false;

  mobileQuery: MediaQueryList;

  fillerNav = Array(20).fill(0).map((_, i) => `Nav Item ${i + 1}`);

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  changeTheme(): void {
    if (this.isDarkTheme) {
        this.isDarkTheme = false;
    } else {
        this.isDarkTheme = true;
    }
  }  

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
