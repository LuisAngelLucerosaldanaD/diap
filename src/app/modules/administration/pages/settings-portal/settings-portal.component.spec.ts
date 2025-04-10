import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsPortalComponent } from './settings-portal.component';

describe('SettingsPortalComponent', () => {
  let component: SettingsPortalComponent;
  let fixture: ComponentFixture<SettingsPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsPortalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SettingsPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
