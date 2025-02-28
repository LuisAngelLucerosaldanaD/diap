import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamsComplementariosComponent } from './exams-complementarios.component';

describe('ExamsComplementariosComponent', () => {
  let component: ExamsComplementariosComponent;
  let fixture: ComponentFixture<ExamsComplementariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamsComplementariosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExamsComplementariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
