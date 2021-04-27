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
    this.unselectAllComponents().then(() => {
      tar.classList.add('selected-component');
    });
  }

  unselectAllComponents(): Promise<void> {
    const selectedClass = 'selected-component';
    const selectedComponents = document.querySelectorAll(`.${selectedClass}`);
    return new Promise((resolve) => {
      if (selectedComponents.length > 0) {
        selectedComponents.forEach((el) => {
          if (el.classList.length === 1) {
            el.removeAttribute('class');
            resolve();
          } else {
            el.classList.remove(selectedClass);
            resolve();
          }
        });
      } else {
        resolve();
      }
    });
  }

  getSlots(el: HTMLElement): any[] {
    const component: any = this.allComponents.find(
      (componentObject: any) => componentObject.name === el?.tagName.toLowerCase()
    );
    return component?.slots;
  }
}
