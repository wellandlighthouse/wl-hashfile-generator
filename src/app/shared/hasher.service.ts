import { Injectable } from '@angular/core';

import * as _ from 'lodash';
const md5 = require('md5');

@Injectable()
export class HasherService {

	constructor() { }

	hashField(data: {}[], fields: Array<string>, options?: {}) {
		let opts = _.merge({
			alg: 'md5',
			transform: 'upper',
		}, options);

		for (let item of data) {
			for (let field of fields) {
				let val: string;
				switch (opts.transform) {
					case 'upper':
						val = item[field].toUpperCase();
						break;
					case 'lower':
						val = item[field].toLowerCase();
						break;
					default:
						val = item[field];
						break;
				}
				item[field] = md5(val);
			}
		}
		return data;
	}

}
