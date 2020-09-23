import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FinListComponent } from './fin-list.component';

describe('FinListComponent', () => {
  let component: FinListComponent;
  let fixture: ComponentFixture<FinListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinListComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FinListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
