import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { IonicModule } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { MoviesPage } from './movies.page';

const storageIonicMock: any = {
  get: () => new Promise<any>((resolve, reject) => resolve('As2342fAfgsdr')),
  set: () => new Promise<any>((resolve, reject) => resolve('As2342fAfgsdr'))
};

describe('MoviesPage', () => {
  let component: MoviesPage;
  let fixture: ComponentFixture<MoviesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviesPage ],
      providers: [
        {
          provide: Storage,
          useValue: storageIonicMock
        }
      ],
      imports: [IonicModule, HttpClientTestingModule, RouterTestingModule]

    }).compileComponents();

    fixture = TestBed.createComponent(MoviesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
