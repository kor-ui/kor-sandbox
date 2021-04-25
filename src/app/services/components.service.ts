import { Injectable } from '@angular/core';

declare const require: any;

@Injectable({
  providedIn: 'root',
})
export class ComponentsService {
  allComponents: any[] = [];
  selectedElement: HTMLElement | undefined;
  selectedComponent: any;
  elementStyles: string | undefined | null;
  elementInnerText: string | undefined;

  constructor() {
    this.getAllComponents();
  }

  getAllComponents(): void {
    // get custom and native elements
    require('../../assets/custom-elements.json').tags.forEach((el: any) => {
      this.allComponents.push(el);
    });
    require('../../assets/native-elements.json').tags.forEach((el: any) => {
      this.allComponents.push(el);
    });
    // then sort alphabetically by component name
    this.allComponents.sort((a: any, b: any) => a.name.localeCompare(b.name));
  }

  selectComponent(tar: any): void {
    this.selectedElement = tar;
    this.elementStyles = this.selectedElement?.getAttribute('style');
    this.elementInnerText = this.selectedElement?.innerText;
    this.selectedComponent = this.allComponents.find(
      (el: any) => el.name === tar.tagName.toLowerCase()
    );
    const selectedComponents = document.querySelectorAll('.selected-component');
    selectedComponents.forEach((el) => el.removeAttribute('class'));
    tar.classList.add('selected-component');
  }

  getSlots(el: HTMLElement): any {
    const component: any = this.allComponents.find(
      (componentObject: any) => componentObject.name === el?.tagName.toLowerCase()
    );
    return component?.slots;
  }
}
