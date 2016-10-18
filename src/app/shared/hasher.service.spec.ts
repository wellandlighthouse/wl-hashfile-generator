/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HasherService } from './hasher.service';

describe('Service: Hasher', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HasherService]
    });
  });

  it('should ...', inject([HasherService], (service: HasherService) => {
    expect(service).toBeTruthy();
  }));
});
