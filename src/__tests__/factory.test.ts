import { Resume } from '..';

// https://github.com/jsonresume/resume-schema/blob/v1.0.0/examples/valid/complete.json
// tslint:disable:object-literal-sort-keys no-any
const fixture = {
  email: 'richard.hendriks@piedpiper.com',
  label: 'Founder & CEO',
  location: {
    city: 'San Francisco',
  },
  name: 'Richard Hendriks',
  phone: '(912) 555-4321',
  summary:
    'Richard hails from Tulsa. He has earned degrees from the University of Oklahoma and Stanford.',
  url: 'https://piedpiper.com',
};

describe('Resume', () => {
  it('Has sensible default when empty constructor', () => {
    const subject = new Resume();
    expect(subject).toMatchSnapshot();
  });
  it('We can provide a partially valid constructor object', () => {
    const subject = new Resume(fixture);
    expect(subject).toMatchSnapshot();
  });
});
