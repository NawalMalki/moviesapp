import { TestBed } from '@angular/core/testing';

import { GetFavoriteAlbumsService } from './get-favorite-album.service';

describe('GetFavoriteAlbumService', () => {
  let service: GetFavoriteAlbumsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetFavoriteAlbumsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
