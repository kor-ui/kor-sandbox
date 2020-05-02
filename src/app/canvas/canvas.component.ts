import { Component, OnInit } from '@angular/core';
import { DragService } from '../services/drag.service';
import { ComponentsService } from '../services/components.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements OnInit {

  constructor(
    public drag: DragService,
    public components: ComponentsService
  ) {}

  ngOnInit(): void {}

  public selectComponent(tar): void {
    this.components.selectedElement = tar;
    this.components.selectedComponent = this.components.allComponents.find(el => el.name == tar.tagName.toLowerCase());
    tar.classList.add('selected');
    console.log(this.components.selectedComponent);
  }
}
