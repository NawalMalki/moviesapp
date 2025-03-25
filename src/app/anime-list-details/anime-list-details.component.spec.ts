import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeListDetailsComponent } from './anime-list-details.component';

describe('AnimeListDetailsComponent', () => {
  let component: AnimeListDetailsComponent;
  let fixture: ComponentFixture<AnimeListDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnimeListDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnimeListDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
