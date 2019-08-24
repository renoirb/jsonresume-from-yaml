/* tslint:disable:object-literal-sort-keys */

import { Walker } from '..';

const mockingSchema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Resume Schema',
  type: 'object',
  additionalProperties: false,
  properties: { basics: {}, foo: {} },
};
const schemaString = JSON.stringify(mockingSchema);

describe('Walker', () => {
  it('Has a default JSONResume schema', () => {
    const subject = new Walker(schemaString);
    expect(subject).toHaveProperty('schemaString', schemaString);
    expect(subject).toHaveProperty('sections', [
      // ['basics', 'foo']
      ...Object.keys(mockingSchema.properties),
    ]);
  });
});
