import { BasePageComponents } from "@pageObjects/base.pageComponents";

export default class Footer extends BasePageComponents {
  readonly twitterLink = this.host.getByRole('link', { name: 'Twitter' });
  readonly facebookLink = this.host.getByRole('link', { name: 'Facebook' });
  readonly linkedinLink = this.host.getByRole('link', { name: 'LinkedIn' });
  readonly copyrightText = this.host.getByTestId('footer-copy');
}