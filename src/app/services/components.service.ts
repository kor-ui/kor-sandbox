import { Injectable } from '@angular/core';

declare const require;

@Injectable({
  providedIn: 'root',
})
export class ComponentsService {
  public allComponents = require('node_modules/@kor-ui/kor/map.json').tags;
  public selectedElement: HTMLElement;
  public selectedComponent: any;

  constructor() {}

  public selectComponent(tar): void {
    this.selectedElement = tar;
    this.selectedComponent = this.allComponents.find(
      (el) => el.name == tar.tagName.toLowerCase()
    );
    const selectedComponents = document.querySelectorAll('.selected-component');
    selectedComponents.forEach((el) =>
      el.classList.remove('selected-component')
    );
    tar.classList.add('selected-component');
  }
}
