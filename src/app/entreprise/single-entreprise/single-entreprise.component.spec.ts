import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleEntrepriseComponent } from './single-entreprise.component';

describe('SingleEntrepriseComponent', () => {
  let component: SingleEntrepriseComponent;
  let fixture: ComponentFixture<SingleEntrepriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleEntrepriseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
