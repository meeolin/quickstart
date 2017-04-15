import { AfterViewChecked, AfterViewInit, Component, Input, ElementRef, ViewChild } from '@angular/core'
import * as each from 'lodash/each.js';

export interface sertCard {
  description: string;
  position: {
    top: number;
    left: number;
  };
}

@Component({
  selector: 'card',
  templateUrl: 'app/card/card.component.html',
  styleUrls: ['app/card/card.css'],
})
export class CardComponent implements AfterViewInit, AfterViewChecked {
  @Input() sert: sertCard;
  @ViewChild('card') card: ElementRef;

  ngAfterViewInit() {
    let nodes = this.card.nativeElement.children;
    nodes[0].remove();
    each(nodes, (node: HTMLElement) => {
      this.colorizeNodes(node);
    });
  }

  ngAfterViewChecked() {
    this.countPopupPosition();
  }

  colorizeNodes(node: any) {
    let sslNameChild = node.children && node.children.item(0);
    if (sslNameChild) {
      sslNameChild.style.color = this.getColor(sslNameChild.innerText);
    }
  }

  getColor(text: string): string {
    switch (text.toLowerCase()) {
      case '[dv]': return 'orange';
      case '[wildcard]': return 'purple';
      case '[idn]': return 'green';
      case '[ov]': return 'cadetblue';
      default: return 'maroon';
    }
  }

  countPopupPosition() {
    let card = this.card.nativeElement;
    const height = card.clientHeight;
    const width = card.clientWidth;
    const top = this.sert.position.top;
    const left = this.sert.position.left;
    const maxY = window.innerHeight;

    if (left - width < 20) {
      card.style.left = 20 + 'px';
    } else {
      card.style.left = left - width + 'px';
    }
    if (top + height > maxY) {
      card.style.top = top - height - 20 + 'px';
    } else {
      card.style.top = top + 20 + 'px';
    }
  }

}
