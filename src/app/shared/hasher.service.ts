import { Injectable } from '@angular/core';

import * as _ from 'lodash';
var md5 = require('md5');

@Injectable()
export class HasherService {

	constructor() { }

	hashField(data: {}[], fields: Array<string>, options?: {}) {
		let opts = _.merge({
			alg: 'md5'
		}, options);

		for (let item of data) {
			for (let field of fields) {
				item[field] = md5(item[field]);
			}
		}
		return data;
	}

}
