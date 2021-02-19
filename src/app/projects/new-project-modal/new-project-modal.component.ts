import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-new-project-modal',
  templateUrl: './new-project-modal.component.html',
  styleUrls: ['./new-project-modal.component.scss']
})
export class NewProjectModalComponent implements OnInit {
  visible: boolean;
  @Output() close = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    console.log('hi')
    setTimeout(() => {
      // start animation
      this.visible = true;
    }, 0);
  }

  closeModal(): void {
    this.visible = false;
    // wait for animation and remove component
    setTimeout(() => (this.close.emit()), 100);
  }
}
