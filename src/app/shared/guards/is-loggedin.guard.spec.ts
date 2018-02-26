import { TestBed, async, inject } from '@angular/core/testing';

import { IsLoggedinGuard } from './is-loggedin.guard';

describe('IsLoggedinGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsLoggedinGuard]
    });
  });

  it('should ...', inject([IsLoggedinGuard], (guard: IsLoggedinGuard) => {
    expect(guard).toBeTruthy();
  }));
});
