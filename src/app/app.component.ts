import { Component } from '@angular/core';
import { DragService } from './services/drag.service';

declare const require;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor(
    public drag: DragService
  ) {}

  public handleContextMenu(e): void {
    e.preventDefault();
    console.log(e.target.properties);
  }
}
