import { Component, OnInit } from '@angular/core';
import { ComponentsService } from '../services/components.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
})
export class ConfigurationComponent implements OnInit {
  public styleOptions = { 
    theme: 'vs-light', 
    language: 'html',
    lineNumbers: 'off',
    minimap: {
      enabled: false
    }
  };
  public style: string;

  constructor(public components: ComponentsService) {}

  ngOnInit(): void {}

  public setElementAttribute(name, value): void {
    if (!value || value == 'unnamed') {
      this.components.selectedElement.removeAttribute(name);
    } else {
      this.components.selectedElement?.setAttribute(name, value);
    }
  }

  public getAttributeValue(name): string | number | boolean {
    const value = this.components.selectedElement.getAttribute(name);
    return value !== 'null' ? value : null;
  }

  public removeSelectedElement(): void {
    const el = this.components.selectedElement;
    el.parentNode.removeChild(el);
  }

  public log(val) {
    console.log(val)
  }
}
