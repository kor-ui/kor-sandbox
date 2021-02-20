import { Component, OnInit } from '@angular/core';
import { ComponentsService } from '../../services/components.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
})
export class ConfigurationComponent implements OnInit {
  expanded = true;
  editorOptions = {
    theme: 'vs-light',
    language: 'text',
    lineNumbers: 'off',
    minimap: {
      enabled: false,
    },
  };

  constructor(public components: ComponentsService) { }

  ngOnInit(): void { }

  removeSelectedElement(): void {
    const el = this.components.selectedElement;
    el.parentNode.removeChild(el);
  }

  setElementAttribute(type: string, name: string, value: any): void {
    const el = this.components.selectedElement;
    if (type === 'boolean') {
      // boolean handler
      if (value) {
        el.setAttribute(name, value);
      } else {
        el.removeAttribute(name);
      }
    } else {
      if (value !== null && value !== 'unnamed') {
        el.setAttribute(name, value);
      } else {
        el.removeAttribute(name);
      }
    }
  }
}
