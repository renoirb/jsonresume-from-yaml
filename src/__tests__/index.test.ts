import { createLoader, SchemaManager, Resume } from '..';

const loaderOptions = {
  cwd: __dirname + '/__fixture__',
};

describe('Usage example', () => {
  const loader = createLoader(loaderOptions);
  const schema = new SchemaManager();

  it('Happy-path', () => {
    const { data } = loader.loadSync({ files: ['basics.yaml'] });
    const stringified = schema.parse('ResumeSchema', 'basics', data);
    const basics = JSON.parse(stringified);
    expect(basics).toMatchSnapshot();
    const subject = new Resume(basics);
    expect(subject).toMatchSnapshot();
  });
});
