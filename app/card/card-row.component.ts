import { Component, Input } from '@angular/core';

@Component({
  selector: 'card-row',
  template: `
    <div>
      <span [ngStyle]='node.style' *ngIf='node.text'>{{node.text}}</span>
      <card-row *ngFor='let child of node.children' [node]='child'></card-row>
    </div>
  `,
})
export class CardRowComponent {
  @Input() node;
}
