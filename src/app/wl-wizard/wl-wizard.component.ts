import { Component, OnChanges, SimpleChange, OnInit, Input, Output, EventEmitter } from '@angular/core';

import * as _ from 'lodash';

@Component({
  selector: 'wl-wizard',
  templateUrl: './wl-wizard.component.html',
  styleUrls: ['./wl-wizard.component.scss']
})
export class WlWizardComponent implements OnChanges {

  constructor() {
  }

  @Input() finishText = 'Finish';
  @Input() step = 1;
  @Input() options = {
    controls: true
  };
  @Output() finish = new EventEmitter();
  @Output() stepChange = new EventEmitter();
  private opts = {
    controls: true,
    buttonClass: 'btn btn-primary'
  };
  private steps = 0;
  private isOnFinalStep = () => this.step === this.steps;
  private isOnFirstStep = () => this.step === 1;

  ngOnInit() {
    _.merge(this.opts, this.options);
  }

  ngOnChanges(changes) {
    if (changes.step) {
      this.stepChange.emit(this.step);
    }
  }

  public addStep() {
    const newSteps = this.steps + 1;

    this.steps = newSteps;

    return newSteps;
  }

}
