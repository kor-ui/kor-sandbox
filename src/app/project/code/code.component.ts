import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss'],
})
export class CodeComponent implements OnInit {
  visible = false;
  codeOptions = {
    theme: 'vs-light',
    language: 'html',
    formatOnPaste: true,
    formatOnType: true,
    codeLens: false,
    minimap: {
      enabled: false
    }
  };
  @Input() code: string | undefined;
  @Output() close = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.visible = true;
    }, 0);
  }

  formatCode(editor: any): void {
    setTimeout(() => {
      editor.getAction('editor.action.formatDocument').run();
      editor.layout();
    }, 500);
  }

  // closes modal after animation completes
  closeModal(): void {
    this.visible = false;
    setTimeout(() => {
      this.close.emit(this.code);
    }, 100);
  }
}
