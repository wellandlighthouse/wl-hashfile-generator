/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CsvDataService } from './csv-data.service';

describe('Service: CsvData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CsvDataService]
    });
  });

  it('should ...', inject([CsvDataService], (service: CsvDataService) => {
    expect(service).toBeTruthy();
  }));
});
