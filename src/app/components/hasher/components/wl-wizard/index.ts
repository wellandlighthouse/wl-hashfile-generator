/* beautify ignore:start */
import {Component, OnChanges, SimpleChange, OnInit, Input, Output, EventEmitter} from '@angular/core';
import * as _ from 'lodash';
/* beautify ignore:end */

@Component({
    selector: 'wl-wizard',
    styles: [require('./style.scss').toString()],
    template: require('./template.html')
})
export class WlWizardComponent implements OnChanges {
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

    ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
        if(changes.step) {
            this.stepChange.emit(this.step);
        }
    }

    public addStep() {
        const newSteps = this.steps + 1;

        this.steps = newSteps;

        return newSteps;
    }
}