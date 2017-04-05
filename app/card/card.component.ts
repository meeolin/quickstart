import { Component, Input, OnInit, ElementRef } from '@angular/core'

export interface sertCard {
  description: string;
  data? : any;
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
export class CardComponent implements OnInit {
  @Input() sert: sertCard;

  constructor(private ref: ElementRef) {}

  parseDescription() {
    let tmpElement = document.createElement('div');
    tmpElement.id='root';
    tmpElement.innerHTML = this.sert.description;
    let collection = tmpElement.getElementsByTagName('div');
    return this.parseCollection(collection, tmpElement);
  }

  parseCollection(collection: NodeListOf<HTMLDivElement>, root: any) {
    let newCollection = [];
    for (let i = 0; i < collection.length; i++) {
      let element = collection.item(i);
      let text = element.textContent;
      if (text !== '__localname__' && element.parentElement.isEqualNode(root)) {
        newCollection.push({
          children: this.parseNode(element.childNodes),
        });
      }
    }
    return newCollection;
  }

  parseNode(nodes: NodeList): Array<any> {
    let result = [];
    for (let i = 0; i < nodes.length; i++) {
      if (nodes.item(i).nodeName === '#text') {
        result.push({
          text: nodes.item(i).nodeValue,
        });
      } else {
        let text = nodes.item(i).textContent;
        let style = this.parceStyle(nodes.item(i).attributes);
        style['color'] = this.parceColor(text) || style['color'];
        let children = [];
        if (nodes.item(i).childNodes.length > 1) {
          children = this.parseNode(nodes.item(i).childNodes);
        }
        result.push({
          text: text,
          style: style,
          children: children,
        });
      }
    }
    return result;
  }

  parceStyle(map: NamedNodeMap) {
    let styles = {};
    let string = map.getNamedItem('style').value || null;
    if (string) {
      string.split(';').forEach((style) => {
        if (style) {
          const [key, value] = style.replace(/\s/g, '').split(':');
          styles[key] = value;
        }
      });
    }
    return styles;
  }

  parceColor(text: string): string {
    if (text.toLowerCase() === '[dv]') {
      return 'orange';
    } else if (text.toLowerCase() === '[wildcard]') {
      return 'purple';
    } else if(text.toLowerCase() === '[idn]') {
      return 'green';
    }
    return;
  }

  countPOpupPosition() {
    let maxY = window.innerHeight;
    let maxX = window.innerWidth;
    if (this.sert.position.left - 250 < 20) {
      this.sert.position.left = this.sert.position.left = 20;
    } else {
      this.sert.position.left = this.sert.position.left - 250
    }
    if (this.sert.position.top + 200 > maxY) {
      this.sert.position.top = this.sert.position.top - 230;
    } else {
      this.sert.position.top = this.sert.position.top + 20;
    }
  }

  ngOnInit() {
    this.countPOpupPosition();
    this.sert.data = this.parseDescription();
  }
}
