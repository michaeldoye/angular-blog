import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Injectable()
export class SidenavService {

  private sidenav: MatSidenav;


  public setSidenav(sidenav: MatSidenav): void {
    this.sidenav = sidenav;
  }

  public open(): Promise<void> {
    return this.sidenav.open();
  }

  public close(): Promise<void> {
    return this.sidenav.close();
  }

  public toggle(): void {
    this.sidenav.toggle();
  }

  get isOpen(): boolean {
    return this.sidenav.opened;
  }

}
