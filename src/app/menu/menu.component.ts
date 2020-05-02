import { Component, OnInit } from '@angular/core';
import { DragService } from '../services/drag.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public components = require('../../assets/components.json');

  constructor(
    public drag: DragService
  ) { }

  ngOnInit(): void {
    this.populateMenu();
  }

  private populateMenu(): void {
    const pane = document.querySelector('kor-pane');
    this.components.forEach(component => {
      // set tag name
      const el = document.createElement(`kor-${component.tag ? component.tag : component.name}`);
      // set properties
      component.properties.forEach(prop => {
        if (!prop.value) {
          el.removeAttribute(prop.name);
        } else {
          el.setAttribute(prop.name, prop.value);
        }
      });
      // set drag events
      el.draggable = true;
      el.ondragstart = () => this.drag.handleDragStart(event);
      // append child to pane
      pane.appendChild(el);
    });
  }

}
