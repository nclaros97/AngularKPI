/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TiemposComponent } from './tiempos.component';

describe('TiemposComponent', () => {
  let component: TiemposComponent;
  let fixture: ComponentFixture<TiemposComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiemposComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiemposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
