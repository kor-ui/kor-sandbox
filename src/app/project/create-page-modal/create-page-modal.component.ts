import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-create-page-modal',
  templateUrl: './create-page-modal.component.html',
  styleUrls: ['./create-page-modal.component.scss']
})
export class CreatePageModalComponent implements OnInit {
  visible: boolean | undefined;
  pageName: string | undefined;
  @Output() close = new EventEmitter<null>();
  @Output() confirm = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => this.visible = true, 0);
  }

  closeModal(): void {
    this.visible = false;
    setTimeout(() => this.close.emit(), 100);
  }

  setNewPageName(e: Event): void {
    this.pageName = (<any>e.target).value;
  }

}
