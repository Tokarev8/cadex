import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupComponentTs } from './popup.component.ts.ts';

describe('PopupComponentTs', () => {
  let component: PopupComponentTs;
  let fixture: ComponentFixture<PopupComponentTs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupComponentTs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupComponentTs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
