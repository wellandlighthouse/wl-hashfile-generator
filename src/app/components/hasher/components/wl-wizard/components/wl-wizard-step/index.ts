/* beautify ignore:start */
import {Component} from '@angular/core';
import {WlWizardComponent} from '../../index';
/* beautify ignore:end */

@Component({
    selector: 'wl-wizard-step',
    styles: [require('./style.scss').toString()],
    host: {
        '[style.display]': 'isCurrent ? "flex" : "none"',
    },
    template: require('./template.html')
})
export class WlWizardStepComponent {
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