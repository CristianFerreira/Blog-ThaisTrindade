import { BlogTravelWebAppPage } from './app.po';

describe('blog-travel-web-app App', () => {
  let page: BlogTravelWebAppPage;

  beforeEach(() => {
    page = new BlogTravelWebAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
