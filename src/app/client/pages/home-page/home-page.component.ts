import { Component, OnInit } from '@angular/core';
import { routeAnimation } from '../../../route.animation';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  host: {
    '[@routeAnimation]': 'true'
  },
  animations: [ routeAnimation ]
})
export class HomePageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
