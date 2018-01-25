import {inject, TestBed} from '@angular/core/testing';

import {ShipurldataService} from './shipurldata.service';

describe('ShipurldataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShipurldataService]
    });
  });

  it('should be created', inject([ShipurldataService], (service: ShipurldataService) => {
    expect(service).toBeTruthy();
  }));
});
