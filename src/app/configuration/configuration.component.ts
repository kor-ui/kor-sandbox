import { Component, OnInit } from '@angular/core';
import { ComponentsService } from '../services/components.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  constructor(
    public components: ComponentsService
  ) {}

  ngOnInit(): void {
  }

  public setElementAttribute(name, value): void {
    if (!value || value == 'unnamed') {
      this.components.selectedElement.removeAttribute(name);
    } else {
      this.components.selectedElement?.setAttribute(name, value);
    }
  }

  public getAttributeValue(name): string|number|boolean {
    const value = this.components.selectedElement.getAttribute(name);
    return value !== 'null' ? value : null;
  }

  public removeSelectedElement(): void {
    const el = this.components.selectedElement;
    el.parentNode.removeChild(el);
  }

  public getParentSlots(): any {
    const parentElement = this.components?.selectedElement?.parentElement;
    const parentComponent = this.components?.allComponents.find(el => el.name == parentElement?.tagName.toLowerCase());
    return parentComponent?.slots;
  }
  
}
