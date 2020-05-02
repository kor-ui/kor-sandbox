import { Component, OnInit } from '@angular/core';
import { DragService } from '../services/drag.service';

declare const require;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  public components = require('node_modules/@kor-ui/kor/map.json').tags;

  constructor(public drag: DragService) {}

  ngOnInit(): void {
    console.log(this.components)
  }
}
