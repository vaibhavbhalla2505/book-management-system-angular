import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormInputsComponent } from './form-inputs.component';
describe('FormImputsComponent', () => {
  let component: FormInputsComponent;
  let fixture: ComponentFixture<FormInputsComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormInputsComponent]
    })
    .compileComponents();
    fixture = TestBed.createComponent(FormInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});