import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'alten-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {

  @Input() title: string | undefined;

  @Input() leftButtonText: string | undefined;
  @Input() leftButtonDisable: boolean = false;
  @Output() leftButtonAction: EventEmitter<any> = new EventEmitter<any>();

  @Input() centerButtonText: string | undefined;
  @Input() centerButtonDisable: boolean = false;
  @Output() centerButtonAction: EventEmitter<any> = new EventEmitter<any>();

  @Input() rightButtonText: string | undefined;
  @Input() rightButtonDisable: boolean = false;
  @Output() rightButtonAction: EventEmitter<any> = new EventEmitter<any>();

}
