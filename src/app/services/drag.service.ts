import { Injectable } from '@angular/core';
import { ComponentsService } from './components.service';

@Injectable({
  providedIn: 'root',
})
export class DragService {
  constructor(public components: ComponentsService) { }

  // start dragging
  handleDragStart(e, name: string, type: string): void {
    let data;
    if (type === 'copy') {
      data = JSON.stringify(name);
    } else if (type === 'move') {
      e.target.id = 'drag-copy';
      data = e.target.id;
    }
    e.dataTransfer.setData('text/plain', data);
  }

  // drag over canvas
  handleDragOver(e): void {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    if (this.components.getSlots(e.target)) {
      e.target.classList.add('drop-inside');
    } else {
      e.target.classList.add('drop-before');
    }
  }

  // drag over canvas
  handleDragLeave(e): void {
    e.target.removeAttribute('class');
  }

  // drop on canvas
  handleDrop(e): Promise<string> {
    return new Promise((resolve) => {
      this.getDropElement(e).then((el) => {
        // check if target parent has slots
        if (this.components.getSlots(e.target)) {
          // append if so
          e.target.appendChild(el);
        } else {
          // insert before if not
          e.target.parentElement.insertBefore(el, e.target);
          // if target el has slot, set drop el slot to match it
          const targetSlot = e.target.getAttribute('slot');
          if (targetSlot) {
            el.setAttribute('slot', targetSlot);
          }
        }
      }).then(() => {
        // cleanup
        e.dataTransfer.clearData();
        this.handleDragLeave(e);
        resolve('');
      });
    });
  }

  getDropElement(e): Promise<HTMLElement> {
    return new Promise((resolve) => {
      // continue if container has slots
      const data = e.dataTransfer.getData('text/plain');
      if (data === 'drag-copy') {
        // move element if dropping from canvas
        const el = document.getElementById(data);
        el.removeAttribute('id');
        el.removeAttribute('slot');
        resolve(el);
      } else {
        // create element if dropping from menu
        this.createElement(data.slice(1, -1)).then((el) => {
          resolve(el);
        });
      }
    });
  }

  createElement(name: string): Promise<any> {
    return new Promise((resolve) => {
      const el = document.createElement(`${name}`);
      el.removeAttribute('id');
      resolve(el);
    });
  }

  addComponentListeners(tar: any): void {
    tar.draggable = true;
    tar.ondragstart = (e) =>
      this.handleDragStart(e, tar.tagName.toLowerCase(), 'move');
    tar.onmouseover = (e) => {
      tar.classList.add('hovered-component');
      e.stopPropagation();
    };
    tar.onmouseout = () => {
      tar.classList.remove('hovered-component');
      tar.removeAttribute('draggable');
    };
  }
}
