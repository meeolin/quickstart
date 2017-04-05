import { Component, OnInit } from '@angular/core';

import { AppService } from './app.service';

@Component({
  selector: 'my-app',
  templateUrl: './app/app.component.html',
})

export class AppComponent implements OnInit  {
  isCardShown: boolean = false;
  hoveredItem: any;

  constructor(private appService: AppService) {}

  pricelist: any;

  ngOnInit() {
    this.appService.getPriceList().subscribe(d => {
      this.pricelist = d.pricelist;
    });
  }

  onItemHover(item: any, event: MouseEvent) {
    this.hoveredItem = {
      description: item.description_ru,
      position: {
        top: event.y,
        left: event.x,
      },
    }
  }

  onItemBlur() {
    this.hoveredItem = null;
  }

}
