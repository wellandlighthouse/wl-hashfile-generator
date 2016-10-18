import { Component, OnInit } from '@angular/core';
import {WlWizardComponent} from '../wl-wizard.component';


@Component({
  selector: 'wl-wizard-step',
  templateUrl: './wl-wizard-step.component.html',
  host: {
    '[style.display]': 'isCurrent ? "flex" : "none"',
  },
  styleUrls: ['./wl-wizard-step.component.scss']
})
export class WlWizardStepComponent implements OnInit {

  private isCurrent;
  private step;

  constructor(
    private parent: WlWizardComponent
  ) { }

  ngOnInit() {
    this.step = this.parent.addStep();

    this.isCurrent = this.step === this.parent.step;

    this.parent.stepChange.subscribe(step => {
      this.isCurrent = this.step === step;
    });
  }
}
