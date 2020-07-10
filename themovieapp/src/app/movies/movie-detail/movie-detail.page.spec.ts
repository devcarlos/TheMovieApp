import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { IonicModule } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { MovieDetailPage } from './movie-detail.page';

const storageIonicMock: any = {
  get: () => new Promise<any>((resolve, reject) => resolve('As2342fAfgsdr')),
  set: () => new Promise<any>((resolve, reject) => resolve('As2342fAfgsdr'))
};

describe('MovieDetailPage', () => {
  let component: MovieDetailPage;
  let fixture: ComponentFixture<MovieDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieDetailPage ],
      providers: [
        {
          provide: Storage,
          useValue: storageIonicMock
        }
      ],
      imports: [IonicModule, RouterTestingModule, HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(MovieDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
