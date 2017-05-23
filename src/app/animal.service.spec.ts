import { TestBed, inject } from '@angular/core/testing';
import {
  ResponseOptions,
  Response,
  Http, HttpModule,
  BaseRequestOptions,
  RequestMethod
} from '@angular/http';
import { AnimalService } from './animal.service';
declare function require(name: string);

const Pact = require('pact-web');

describe('AnimalService', () => {
  let provider;

  beforeAll(function(done) {
    provider = Pact({ consumer: 'Karma Jasmine', provider: 'Hello', web: true });
    provider.addInteraction({
      uponReceiving: 'a request for hello',
      withRequest: {
        method: 'GET',
        path: '/sayHello'
      },
      willRespondWith: {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: { reply: 'Hello' }
      }
    })
      .then(function() {
        done();
      }, function(err) { done.fail(err); });
  });

  afterAll(function(done) {
    provider.finalize()
      .then(function() { done(); }, function(err) { done.fail(err); });
  });

  beforeEach(function() {
    TestBed.configureTestingModule({
      providers: [AnimalService],
      imports: [HttpModule]
    });
  });


  it('should say hello', function(done) {
    inject([AnimalService], (service: AnimalService) => {

      // Run the tests
      service.sayHello('http://localhost:1234')
        .subscribe((res: any) => {
          expect(res.data.reply).toEqual('Hello');
          done();
        }, err => done.fail(err), () => {
        });

    })();
  });
  // verify with Pact, and reset expectations
  it('successfully verifies', (done) => { provider.verify(); done(); });
  it('should ...', inject([AnimalService], (service: AnimalService) => {
     expect(service).toBeTruthy();
   }));
});
