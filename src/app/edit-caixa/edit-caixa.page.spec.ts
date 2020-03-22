import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditCaixaPage } from './edit-caixa.page';

describe('EditCaixaPage', () => {
  let component: EditCaixaPage;
  let fixture: ComponentFixture<EditCaixaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCaixaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditCaixaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
