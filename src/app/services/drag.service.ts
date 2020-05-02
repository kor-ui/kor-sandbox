import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DragService {

  constructor() { }
  
  // start dragging
  public handleDragStart(e): void {
    e.target.id = 'dragged';
    e.dataTransfer.setData('text/plain', e.target.id);
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
    const id = e.dataTransfer.getData('text/plain');
    const el = document.querySelector(`#${id}`);
    e.target.appendChild(el.cloneNode(true));
    el.removeAttribute('id');
    e.dataTransfer.clearData();
    this.handleDragLeave(e);
  }
}
