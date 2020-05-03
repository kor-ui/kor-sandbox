import { Component, OnInit } from '@angular/core';
import { DragService } from '../services/drag.service';
import { ComponentsService } from '../services/components.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  constructor(public drag: DragService, public components: ComponentsService) {}

  ngOnInit(): void {
    console.log(this.components.allComponents);
  }
}
