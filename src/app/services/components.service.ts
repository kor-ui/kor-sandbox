import { Injectable } from '@angular/core';

declare const require;

@Injectable({
  providedIn: 'root',
})
export class ComponentsService {
  allComponents = [];
  selectedElement: HTMLElement;
  selectedComponent: any;
  elementStyles: string;
  elementInnerText: string;

  constructor() {
    this.getAllComponents();
  }

  getAllComponents(): void {
    require('../../assets/custom-elements.json').tags.forEach(el => this.allComponents.push(el));
    require('../../assets/native-elements.json').tags.forEach(el => this.allComponents.push(el));
  }

  selectComponent(tar: any): void {
    this.selectedElement = tar;
    this.elementStyles = this.selectedElement.getAttribute('style');
    this.elementInnerText = this.selectedElement.innerText;
    this.selectedComponent = this.allComponents.find(
      (el) => el.name === tar.tagName.toLowerCase()
    );
    const selectedComponents = document.querySelectorAll('.selected-component');
    selectedComponents.forEach((el) => el.removeAttribute('class'));
    tar.classList.add('selected-component');
  }

  getSlots(el): any {
    const component = this.allComponents.find(
      (componentObject) => componentObject.name === el?.tagName.toLowerCase()
    );
    return component?.slots;
  }
}
