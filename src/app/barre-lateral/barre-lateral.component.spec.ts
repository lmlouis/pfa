import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarreLateralComponent } from './barre-lateral.component';

describe('BarreLateralComponent', () => {
  let component: BarreLateralComponent;
  let fixture: ComponentFixture<BarreLateralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarreLateralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarreLateralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
