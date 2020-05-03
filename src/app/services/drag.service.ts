import { Injectable } from '@angular/core';
import { ComponentsService } from './components.service';

@Injectable({
  providedIn: 'root',
})
export class DragService {
  constructor(public components: ComponentsService) { }

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
    if (this.components.getSlots(e.target)) {
      e.target.classList.add('drop-inside');
    } else {
      e.target.classList.add('drop-before');
    }
  }

  // drag over canvas
  public handleDragLeave(e): void {
    e.target.removeAttribute('class');
  }

  // drop on canvas
  public handleDrop(e): void {
    this.getDropElement(e).then((el) => {
      if (this.components.getSlots(e.target)) {
        e.target.appendChild(el);
        setTimeout(() => {
          this.components.selectComponent(el);
        }, 0);
      } else {
        e.target.parentElement.insertBefore(el, e.target)
      }
    })
    // cleanup
    e.dataTransfer.clearData();
    this.handleDragLeave(e);
  }

  public getDropElement(e): Promise<HTMLElement> {
    return new Promise(resolve => {
      // continue if container has slots
      const data = e.dataTransfer.getData('text/plain');
      if (data.includes('kor-')) {
        // create element if dropping from menu
        const name = data.slice(1, data.length - 1);
        this.createElement(name).then((el) => {
          resolve(el)
        });
      } else {
        // move element if dropping from canvas
        const el = document.getElementById(data);
        e.target.appendChild(el);
        el.removeAttribute('id');
        el.removeAttribute('slot');
        resolve(el)
      }
    })
  }

  public createElement(name: string): Promise<any> {
    return new Promise(resolve => {
      const el = document.createElement(`${name}`);
      el.draggable = true;
      el.removeAttribute('id');
      el.ondragstart = (e) =>
        this.handleDragStart(e, el.tagName.toLowerCase(), 'move');
      el.onmouseover = (e) => {
        el.classList.add('hovered-component');
        e.stopPropagation();
      };
      el.onmouseout = () => el.classList.remove('hovered-component');
      el.onclick = (e) => {
        this.components.selectComponent(e.target);
        e.stopPropagation();
      };
      resolve(el);
    });
  }
}
