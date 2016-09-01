/* beautify ignore:start */
import {it, inject, beforeEachProviders} from '@angular/core/testing';
import {CsvData} from './index';
/* beautify ignore:end */

describe('Service: CsvData', () => {

    beforeEachProviders(() => [CsvData]);

    it('should be defined', inject([CsvData], (service: CsvData) => {
        expect(service).toBeDefined();
    }));

});