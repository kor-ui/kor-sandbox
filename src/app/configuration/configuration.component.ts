import { Component, OnInit } from '@angular/core';
import { ComponentsService } from '../services/components.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
})
export class ConfigurationComponent implements OnInit {
  public editorOptions = {
    theme: 'vs-light',
    language: 'text',
    lineNumbers: 'off',
    minimap: {
      enabled: false,
    }
  };

  constructor(public components: ComponentsService) {}

  ngOnInit(): void {}

  public setElementSlot(val): void {
    if (val !== null && val !== 'unnamed') {
      this.components.selectedElement.setAttribute('slot', val);
    }  else {
      this.components.selectedElement.removeAttribute('slot')
    }
  }

  public removeSelectedElement(): void {
    const el = this.components.selectedElement;
    el.parentNode.removeChild(el);
  }
}
