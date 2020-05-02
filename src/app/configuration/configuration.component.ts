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

  public setElementAttribute(name, value, type): void {
    if (type == 'Boolean' && !value) {
      this.components.selectedElement.removeAttribute(name);
    } else {
      this.components.selectedElement?.setAttribute(name, value);
    }
  }

  public getAttributeValue(name): any {
    return this.components.selectedElement.getAttribute(name);
  }

}
