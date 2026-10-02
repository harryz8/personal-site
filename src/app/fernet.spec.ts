import { TestBed } from '@angular/core/testing';

import { Fernet } from './fernet';

describe('Fernet', () => {
  let service: Fernet;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Fernet);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
