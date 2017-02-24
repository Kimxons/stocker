import { NgStockerPage } from './app.po';

describe('ng-stocker App', function() {
  let page: NgStockerPage;

  beforeEach(() => {
    page = new NgStockerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
