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
  currentScale = 1;
  contextMenuVisible: boolean | undefined;
  codeModalVisible: boolean | undefined;
  popoverCoords: any = {
    x: null,
    y: null,
  };
  @Input() viewport = this.viewports[3];
  @Input() content: string | undefined;
  @Input() readonly: boolean | undefined;
  @Output() save = new EventEmitter<{ content: string | undefined; viewport: any; }>();
  @Output() setViewport = new EventEmitter<any>();

  constructor(public drag: DragService, public components: ComponentsService) { }

  ngOnInit(): void {
    // observe canvas innerHTML change and update content prop
    const canvas: HTMLCanvasElement | null = document.querySelector('#canvas');
    if (canvas) {
      new MutationObserver(() => {
        this.content = canvas?.innerHTML;
      }).observe(
        canvas,
        {
          subtree: true,
          attributes: true
        });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.content = changes.content?.currentValue;
    this.setCanvasInnerHTML();
  }

  rotateViewport(): void {
    [this.viewport.height, this.viewport.width] = [this.viewport.width, this.viewport.height];
  }

  // update canvas html to match content property
  setCanvasInnerHTML(): void {
    const canvas = document.querySelector('#canvas');
    if (this.content && canvas) {
      // TODO: replace with element ref
      canvas.innerHTML = this.content;
    }
  }

  round(num: number): number {
    return Math.round(num);
  }

  handleContextMenu(e: MouseEvent): void {
    e.preventDefault();
    this.popoverCoords.x = `${e.pageX}px`;
    this.popoverCoords.y = `${e.pageY}px`;
    this.components.selectComponent(e.target);
    this.contextMenuVisible = true;
    const hide = () => {
      this.contextMenuVisible = false;
      document.body.removeEventListener('click', hide);
    };
    document.body.addEventListener('click', hide);
  }

  removeElement(el: HTMLElement | undefined): void {
    this.contextMenuVisible = false;
    el?.parentNode?.removeChild(el);
    this.components.selectedComponent = undefined;
  }

  duplicateElement(el: HTMLElement | undefined): void {
    this.contextMenuVisible = false;
    this.components.unselectAllComponents().then(() => {
      const clone = el?.cloneNode(true);
      if (clone) {
        this.components.selectedComponent = undefined;
        el?.parentNode?.appendChild(clone);
      }
    });
  }
}
