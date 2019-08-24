import { loader, Resume, Walker } from '..';

const loaderOptions = {
  cwd: __dirname + '/__fixture__',
};

describe('Usage example', () => {
  const loaderInstance = loader(loaderOptions);
  const helper = new Walker();

  it('Happy-path', () => {
    const { data } = loaderInstance.loadSync({ files: ['basics.yaml'] });
    const basics = helper.parseSection('basics', data);
    const subject = new Resume(basics);
    expect(subject).toMatchSnapshot();
  });
});
