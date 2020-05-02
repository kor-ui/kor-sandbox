import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DragService {
  constructor() {}

  // start dragging
  public handleDragStart(e, component): void {
    e.dataTransfer.setData('text/plain', JSON.stringify(component));
  }

  // drag over canvas
  public handleDragOver(e): void {
    e.dataTransfer.dropEffect = 'copy';
    e.target.classList.add('drag-over');
    e.preventDefault();
  }

  // drag over canvas
  public handleDragLeave(e): void {
    e.target.classList.remove('drag-over');
  }

  // drop on canvas
  public handleDrop(e): void {
    // e.preventDefault();
    const component = JSON.parse(e.dataTransfer.getData('text/plain'));
    const el = document.createElement(
      `kor-${component.tag ? component.tag : component.name}`
    );
    component.properties.forEach((prop) => {
      if (!prop.value) {
        el.removeAttribute(prop.name);
      } else {
        el.setAttribute(prop.name, prop.value);
      }
    });
    e.target.appendChild(el.cloneNode(true));
    el.removeAttribute('id');
    e.dataTransfer.clearData();
    this.handleDragLeave(e);
  }
}
