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
  ) { }

  ngOnInit(): void {
  }

  public setElementAttribute(name, value): void {
    this.components.selectedElement?.setAttribute(name, value);
  }

}
