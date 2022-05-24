import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarreDroiteComponent } from './barre-droite.component';

describe('BarreDroiteComponent', () => {
  let component: BarreDroiteComponent;
  let fixture: ComponentFixture<BarreDroiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarreDroiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarreDroiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
