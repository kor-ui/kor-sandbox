import { Component, OnInit } from '@angular/core';
import { DragService } from '../services/drag.service';
import { ComponentsService } from '../services/components.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements OnInit {

  public viewports: any[] = [
    {
      name: "desktop",
      icon: "desktop_windows",
      height: "1080px",
      width: "1920px"
    },
    {
      name: "phone_vertical",
      icon: "smartphone",
      height: "667px",
      width: "375px"
    },
    {
      name: "tablet_vertical",
      icon: "tablet_mac",
      height: "1024px",
      width: "768px"
    },
    {
      name: "tablet_horizontal",
      icon: "tablet",
      height: "768px",
      width: "1024px"
    }
  ];
  public currentViewport: any = {
    height: this.viewports[0]?.height,
    width: this.viewports[0]?.width
  };
  public currentScale: number = 0.5;

  constructor(public drag: DragService, public components: ComponentsService) {}

  ngOnInit(): void {}

  public round(num: number): number {
    return Math.round(num);
  }
}
