/* beautify ignore:start */
import {it, inject, beforeEachProviders} from '@angular/core/testing';
import {HasherService} from './index';
/* beautify ignore:end */

describe('Service: HasherService', () => {

    beforeEachProviders(() => [HasherService]);

    it('should be defined', inject([HasherService], (service: HasherService) => {
        expect(service).toBeDefined();
    }));

});