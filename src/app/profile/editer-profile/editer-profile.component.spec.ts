import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditerProfileComponent } from './editer-profile.component';

describe('EditerProfileComponent', () => {
  let component: EditerProfileComponent;
  let fixture: ComponentFixture<EditerProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditerProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
