import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarDiffCssComponent } from './navbar-diff-css.component';

describe('NavbarDiffCssComponent', () => {
  let component: NavbarDiffCssComponent;
  let fixture: ComponentFixture<NavbarDiffCssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarDiffCssComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarDiffCssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
