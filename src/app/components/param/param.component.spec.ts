import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ParamComponent } from './param.component';

describe('ParamComponent', () => {
  let component: ParamComponent;
  let fixture: ComponentFixture<ParamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParamComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ParamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
