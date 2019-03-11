import { TestBed } from '@angular/core/testing';

import { RecipeBackendServiceService } from './recipe-backend-service.service';

describe('RecipeBackendServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecipeBackendServiceService = TestBed.get(RecipeBackendServiceService);
    expect(service).toBeTruthy();
  });
});
