import { TestBed } from '@angular/core/testing';

import { HttpReqService } from './http-req.service';

describe('HttpReqService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpReqService = TestBed.get(HttpReqService);
    expect(service).toBeTruthy();
  });
});
