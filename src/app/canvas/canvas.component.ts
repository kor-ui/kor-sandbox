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
  public currentViewport: any = {
    height: this.viewports[1]?.height,
    width: this.viewports[1]?.width,
  };
  public currentScale: number = 0.75;
  public codeOptions = {
    theme: 'vs-light',
    language: 'html',
    // readOnly: true,
    formatOnPaste: true,
    formatOnType: true,
  };
  public code: string;
  public showContextMenu: boolean;
  public popoverCoords: any = {
    x: null,
    y: null
  }

  constructor(public drag: DragService, public components: ComponentsService) {}

  ngOnInit(): void {}

  public rotateDevice(): void {
    const previousWidth = this.currentViewport.width;
    const previousHeight = this.currentViewport.height;
    this.currentViewport.height = previousWidth;
    this.currentViewport.width = previousHeight;
  }

  public getCode(): void {
    this.code = document.querySelector('#canvas').innerHTML;
  }

  public formatCode(editor): void {
    setTimeout(() => {
      editor.getAction('editor.action.formatDocument').run();
    }, 100);
  }

  public round(num: number): number {
    return Math.round(num);
  }

  public handleContextMenu(e): void {
    e.preventDefault();
    this.popoverCoords.x = `${e.pageX}px`;
    this.popoverCoords.y = `${e.pageY}px`;
    console.log(this.popoverCoords);
    this.components.selectComponent(e.target);
    this.showContextMenu = true;
    console.log(e.target);
    const hide = () => {
      this.showContextMenu = false;
      document.body.removeEventListener('click', hide);
    }
    document.body.addEventListener('click', hide);
  }

  public removeElement(el: HTMLElement): void {
    el.parentNode.removeChild(el);
  }

  public duplicateElement(el: HTMLElement): void {
    const clone = el.cloneNode(true);
    el.parentNode.appendChild(clone);
  }
}
