import { DigitalHarborAppPage } from './app.po';

describe('digital-harbor-app App', () => {
  let page: DigitalHarborAppPage;

  beforeEach(() => {
    page = new DigitalHarborAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
