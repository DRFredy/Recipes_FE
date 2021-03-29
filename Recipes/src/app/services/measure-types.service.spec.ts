import { TestBed } from '@angular/core/testing';

import { MeasureTypesService } from './measure-types.service';

describe('MeasureTypesService', () => {
  let service: MeasureTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeasureTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
