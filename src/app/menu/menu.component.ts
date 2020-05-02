import { Component, OnInit } from '@angular/core';
import { DragService } from '../services/drag.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  public components = require('../../assets/components.json');

  constructor(public drag: DragService) {}

  ngOnInit(): void {}
}
