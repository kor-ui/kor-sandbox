import { Component, OnInit } from '@angular/core';
import { DragService } from '../services/drag.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements OnInit {
  constructor(public drag: DragService) {}

  ngOnInit(): void {}

  public handleContextMenu(e): void {
    e.preventDefault();
    console.log(e.target.properties);
  }
}
