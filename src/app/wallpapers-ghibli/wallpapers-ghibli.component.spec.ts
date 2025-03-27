import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WallpapersGhibliComponent } from './wallpapers-ghibli.component';

describe('WallpapersGhibliComponent', () => {
  let component: WallpapersGhibliComponent;
  let fixture: ComponentFixture<WallpapersGhibliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WallpapersGhibliComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WallpapersGhibliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
