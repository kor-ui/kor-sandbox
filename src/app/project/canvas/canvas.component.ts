import { Component, Input, OnInit } from '@angular/core';
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
      label: 'Desktop (1920x1080)',
      icon: 'desktop_windows',
      width: '1920px',
      height: '1080px',
    },
    {
      label: 'Laptop (1366x768)',
      icon: 'laptop',
      width: '1366px',
      height: '768px',
    },
    {
      label: 'Tablet (1024x768)',
      icon: 'tablet_mac',
      height: '1024px',
      width: '768px',
    },
    {
      label: 'Phone (375x667)',
      icon: 'smartphone',
      width: '375px',
      height: '667px',
    },
  ];
  currentViewport = this.viewports[3];
  currentScale = 1;
  code: string;
  showContextMenu: boolean;
  popoverCoords: any = {
    x: null,
    y: null,
  };
  @Input() label: string;

  constructor(public drag: DragService, public components: ComponentsService) { }

  ngOnInit(): void { }

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
