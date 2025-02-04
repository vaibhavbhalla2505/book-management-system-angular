import { TestBed } from '@angular/core/testing';
import { BookfetchService } from './bookfetch.service';
describe('BookfetchService', () => {
  let service: BookfetchService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookfetchService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});