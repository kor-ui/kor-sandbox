import { Injectable } from '@angular/core';

declare const require;

@Injectable({
  providedIn: 'root'
})
export class ComponentsService {
  public allComponents = require('node_modules/@kor-ui/kor/map.json').tags;
  public selectedElement: HTMLElement;
  public selectedComponent: any;

  constructor() { }
}
