import { WlHashfileGeneratorPage } from './app.po';

describe('wl-hashfile-generator App', function() {
  let page: WlHashfileGeneratorPage;

  beforeEach(() => {
    page = new WlHashfileGeneratorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
