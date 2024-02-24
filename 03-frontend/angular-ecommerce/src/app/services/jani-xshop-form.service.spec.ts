import { TestBed } from '@angular/core/testing';

import { JaniXShopFormService } from './jani-xshop-form.service';

describe('JaniXShopFormService', () => {
  let service: JaniXShopFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JaniXShopFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
