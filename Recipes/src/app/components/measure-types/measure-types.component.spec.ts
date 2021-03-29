import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasureTypesComponent } from './measure-types.component';

describe('MeasureTypesComponent', () => {
  let component: MeasureTypesComponent;
  let fixture: ComponentFixture<MeasureTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeasureTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasureTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
