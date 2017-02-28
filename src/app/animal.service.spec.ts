import { TestBed, inject } from '@angular/core/testing';
import {
  ResponseOptions,
  Response,
  Http, HttpModule,
  BaseRequestOptions,
  RequestMethod
} from '@angular/http';
import { AnimalService } from './animal.service';
import { Pact } from 'pact';

describe('AnimalService', () => {
  let provider;

  beforeAll(function (done) {

    provider = Pact({ consumer: 'Karma Jasmine', provider: 'Hello' });
    // required for slower Travis CI environment
    setTimeout(function () { done(); }, 2000);
  });

  afterAll(function (done) {
    provider.finalize()
      .then(function () { done() }, function (err) { done.fail(err) })
  })

  describe("sayHello", function () {
    beforeEach(function (done) {
      TestBed.configureTestingModule({
        providers: [AnimalService],
        imports: [HttpModule]
      });
      provider.addInteraction({
        uponReceiving: 'a request for hello',
        withRequest: {
          method: 'GET',
          path: '/sayHello'
        },
        willRespondWith: {
          status: 200,
          headers: { "Content-Type": "application/json" },
          body: { reply: "Hello" }
        }
      })
        .then(function () { done() }, function (err) { done.fail(err) })
    })
    it('should ...', inject([AnimalService], (service: AnimalService) => {
      expect(service).toBeTruthy();
    }));
    it("should say hello", function (done) {
      inject([AnimalService], (service: AnimalService) => {

        //Run the tests
        service.sayHello('http://localhost:1234')
          .subscribe((res: any) => {
            expect(JSON.parse(res.responseText)).toEqual({ reply: "Hello" })
            done();
          }, err => done.fail(err), () => {
          });

      })();
    })

    // verify with Pact, and reset expectations
    it('successfully verifies', function (done) { provider.verify(); done(); })
  })
});
