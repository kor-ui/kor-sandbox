import { Injectable } from '@angular/core';
import { ComponentsService } from './components.service';

@Injectable({
  providedIn: 'root',
})
export class DragService {
  constructor(public components: ComponentsService) {}

  // start dragging
  public handleDragStart(e, name: string, type: string): void {
    let data;
    if (type == 'copy') {
      data = JSON.stringify(name);
    } else if (type == 'move') {
      e.target.id = 'drag-copy';
      data = e.target.id;
    }
    e.dataTransfer.setData('text/plain', data);
  }

  // drag over canvas
  public handleDragOver(e): void {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    e.target.classList.add('drag-over');
  }

  // drag over canvas
  public handleDragLeave(e): void {
    e.target.classList.remove('drag-over');
  }

  // drop on canvas
  public handleDrop(e): void {
    const data = e.dataTransfer.getData('text/plain');
    if (data.includes('kor-')) {
      // create element if dropping from menu
      const name = data.slice(1, data.length - 1);
      this.createElement(name).then((el) => {
        e.target.appendChild(el);
        setTimeout(() => {
          this.components.selectComponent(el);
        }, 0);
      });
    } else {
      // move element if dropping from canvas
      const el = document.getElementById(data);
      e.target.appendChild(el);
      el.removeAttribute('id');
      el.removeAttribute('slot');
    }
    // cleanup
    e.dataTransfer.clearData();
    this.handleDragLeave(e);
  }

  public createElement(name: string): Promise<any> {
    return new Promise((resolve) => {
      const el = document.createElement(`${name}`);
      el.draggable = true;
      el.removeAttribute('id');
      el.ondragstart = (e) =>
        this.handleDragStart(e, el.tagName.toLowerCase(), 'move');
      el.onmouseover = (e) => e.stopPropagation();
      resolve(el);
    });
  }
}
