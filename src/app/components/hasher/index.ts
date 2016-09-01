/* beautify ignore:start */
import {Component, OnInit} from '@angular/core';
import {CsvData} from './services/csvdata';
import {UploaderComponent} from './components/uploader';
import {FieldMapperComponent} from './components/field-mapper';
import {WlWizardComponent} from './components/wl-wizard';
import {WlWizardStepComponent} from './components/wl-wizard/components/wl-wizard-step';
import {HasherService} from './services/hasher';
/* beautify ignore:end */

@Component({
    selector: 'hasher',
    styles: [require('./style.scss').toString()],
    directives: [
        UploaderComponent,
        FieldMapperComponent,
        WlWizardComponent,
        WlWizardStepComponent
    ],
    providers: [CsvData, HasherService],
    template: require('./template.html')
})
export class HasherComponent implements OnInit {
    private step = 1;
    private wizardOpts:{};

    constructor(private csvData: CsvData) {

    }

    ngOnInit() {
        console.log('hasher');
        this.wizardOpts = {
            controls: false
        };
    }

    onStepComplete() {
        console.log('step complete');
        this.step++;
    }

    onFinish() {
        console.log('Finished!');
    }
}
