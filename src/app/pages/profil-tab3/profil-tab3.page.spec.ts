import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProfilTab3Page } from './profil-tab3.page';

describe('ProfilTab3Page', () => {
  let component: ProfilTab3Page;
  let fixture: ComponentFixture<ProfilTab3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilTab3Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilTab3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
