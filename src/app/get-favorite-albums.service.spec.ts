import { TestBed } from '@angular/core/testing';

import { GetFavoriteAlbumsService } from './get-favorite-albums.service';

describe('GetFavoriteAlbumsService', () => {
  let service: GetFavoriteAlbumsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetFavoriteAlbumsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
