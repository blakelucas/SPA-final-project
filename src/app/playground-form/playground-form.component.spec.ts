import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaygroundFormComponent } from './playground-form.component';

describe('PlaygroundFormComponent', () => {
  let component: PlaygroundFormComponent;
  let fixture: ComponentFixture<PlaygroundFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaygroundFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaygroundFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
