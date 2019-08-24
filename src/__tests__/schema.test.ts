import { Resume } from '../schema';

describe('Resume', () => {
  it('Has sensible default when empty constructor', () => {
    const subject = new Resume();
    expect(subject).toMatchSnapshot();
  });
});
