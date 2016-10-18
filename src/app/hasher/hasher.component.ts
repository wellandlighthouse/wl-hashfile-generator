import { Component, OnInit } from '@angular/core';

import { CsvDataService, HasherService } from '../shared';

import * as _ from 'lodash';

@Component({
	selector: 'hasher',
	templateUrl: './hasher.component.html',
	styleUrls: ['./hasher.component.scss'],
	providers: [CsvDataService, HasherService],
})
export class HasherComponent implements OnInit {

	private step = 1;
	private wizardOpts: {};

	constructor(private csvData: CsvDataService) {

	}

	ngOnInit() {
		this.wizardOpts = {
			controls: false
		};
	}

	onStepComplete() {
		this.step++;
	}

	onFinish() {
		console.log('Finished!');
	}

}
