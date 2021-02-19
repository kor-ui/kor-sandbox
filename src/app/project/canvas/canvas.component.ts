import { Component, OnInit } from '@angular/core';
import { DragService } from '../../services/drag.service';
import { ComponentsService } from '../../services/components.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements OnInit {
  viewports: any[] = [
    {
      icon: 'desktop_windows',
      width: '1920px',
      height: '1080px',
    },
    {
      icon: 'laptop',
      width: '1366px',
      height: '768px',
    },
    {
      icon: 'tablet_mac',
      height: '1024px',
      width: '768px',
    },
    {
      icon: 'smartphone',
      width: '375px',
      height: '667px',
    },
  ];
  currentViewport: any = {
    height: this.viewports[1]?.height,
    width: this.viewports[1]?.width,
  };
  currentScale: number = 0.75;
  code: string;
  showContextMenu: boolean;
  popoverCoords: any = {
    x: null,
    y: null,
  };

  constructor(public drag: DragService, public components: ComponentsService) {}

  ngOnInit(): void {}

  rotateDevice(): void {
    const previousWidth = this.currentViewport.width;
    const previousHeight = this.currentViewport.height;
    this.currentViewport.height = previousWidth;
    this.currentViewport.width = previousHeight;
  }

  getCode(): void {
    this.code = document.querySelector('#canvas').innerHTML;
  }

  setCode(code: string): void {
    this.code = undefined;
    document.querySelector('#canvas').innerHTML = code;
  }

  round(num: number): number {
    return Math.round(num);
  }

  handleContextMenu(e): void {
    e.preventDefault();
    this.popoverCoords.x = `${e.pageX}px`;
    this.popoverCoords.y = `${e.pageY}px`;
    this.components.selectComponent(e.target);
    this.showContextMenu = true;
    const hide = () => {
      this.showContextMenu = false;
      document.body.removeEventListener('click', hide);
    };
    document.body.addEventListener('click', hide);
  }

  removeElement(el: HTMLElement): void {
    el.parentNode.removeChild(el);
  }

  duplicateElement(el: HTMLElement): void {
    const clone = el.cloneNode(true);
    el.parentNode.appendChild(clone);
  }
}
