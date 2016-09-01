/* beautify ignore:start */
import {it, inject, beforeEachProviders} from '@angular/core/testing';
import {TestComponentBuilder} from '@angular/compiler/testing';
import {HasherComponent} from './index';
import {Assert} from '../../../assert';
/* beautify ignore:end */

describe('Component: HasherComponent', () => {

    let providers = [];
    let assert = new Assert < HasherComponent > (HasherComponent, providers);

    assert.it('should be defined', (component, element, fixture) => {
        fixture.detectChanges();

        expect(component).toBeDefined();
        expect(element).toBeDefined();
    });
});