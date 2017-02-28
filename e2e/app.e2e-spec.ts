import { PactAngular2ExamplePage } from './app.po';

describe('pact-angular2-example App', () => {
  let page: PactAngular2ExamplePage;

  beforeEach(() => {
    page = new PactAngular2ExamplePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
