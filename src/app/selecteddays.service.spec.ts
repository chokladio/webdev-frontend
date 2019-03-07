import { TestBed } from '@angular/core/testing';

import { SelectedDaysService } from './selecteddays.service';

describe('SelecteddaysService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelectedDaysService = TestBed.get(SelectedDaysService);
    expect(service).toBeTruthy();
  });
});
