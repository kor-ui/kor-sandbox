import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss'],
})
export class CodeComponent implements OnInit {
  public visible: boolean = false;
  public codeOptions = {
    theme: 'vs-light',
    language: 'html',
    // readOnly: true,
    formatOnPaste: true,
    formatOnType: true,
    automaticLayout: true,
  };
  @Input() code: string;
  @Output() close = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      this.visible = true;
    }, 0);
  }

  public formatCode(editor): void {
    setTimeout(() => {
      editor.getAction('editor.action.formatDocument').run();
      editor.layout();
    }, 100);
  }

  // closes modal after animation completes
  public closeModal(): void {
    this.visible = false;
    setTimeout(() => {
      this.close.emit(this.code);
    }, 100);
  }
}
