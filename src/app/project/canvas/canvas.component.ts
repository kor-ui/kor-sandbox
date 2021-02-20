import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
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
  showContextMenu: boolean;
  codeModalVisible: boolean;
  popoverCoords: any = {
    x: null,
    y: null,
  };
  @Input() content: string;
  @Output() save = new EventEmitter<string>();

  constructor(public drag: DragService, public components: ComponentsService) { }

  ngOnInit(): void {
    // observe canvas innerHTML change and update content prop
    const canvas = document.querySelector('#canvas');
    new MutationObserver(() => {
      this.content = canvas.innerHTML;
    }).observe(
      canvas,
      {
        subtree: true,
        attributes: true
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.content = changes.content?.currentValue;
    this.setCanvasInnerHTML();
  }

  rotateDevice(): void {
    [this.currentViewport.height, this.currentViewport.width] = [this.currentViewport.width, this.currentViewport.height];
  }

  // update canvas html to match content property
  setCanvasInnerHTML(): void {
    if (this.content) {
      // TODO: replace with element ref
      document.querySelector('#canvas').innerHTML = this.content;
    }
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
