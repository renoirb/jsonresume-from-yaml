/* tslint:disable:object-literal-sort-keys */

import { SchemaManager } from '..';

const basics = {
  type: 'object',
  additionalProperties: true,
  properties: {
    name: {
      type: 'string',
    },
    label: {
      type: 'string',
      description: 'e.g. Web Developer',
    },
  },
  required: ['name'],
};

const mockingSchema = {
  id: 'WhateverGoes',
  $schema: 'http://json-schema.org/draft-04/schema#',
  // id, above, matches title. It seems
  title: 'Whatever Goes',
  type: 'object',
  additionalProperties: false,
  properties: { basics, bar: {}, foo: {} /* Notice ambitions is not here */ },
};
const schemaString = JSON.stringify(mockingSchema);

describe('SchemaManager', () => {
  it('We can inject our own initial JSONSchema schema', () => {
    const subject = new SchemaManager(schemaString);
    expect(subject).toHaveProperty('schemasString', '[' + schemaString + ']');
    expect(subject).toHaveProperty('sections', {
      WhateverGoes: ['basics', 'bar', 'foo'],
    });
    expect(subject).toHaveProperty('schemaNames', ['WhateverGoes']);
  });

  it('schemas getter', () => {
    const another = {
      title: 'Another Schema',
      id: 'AnotherSchema',
      properties: {
        primes: {
          type: 'array',
          contains: {
            type: 'number',
          },
        },
      },
    };
    const subject = new SchemaManager(JSON.stringify(another));
    expect(subject.schemaNames).toMatchSnapshot();
    expect(subject.sections).toMatchSnapshot();
  });

  it('Defaults to JSONResume, generateTypingsFileContents works too', async () => {
    const subject = new SchemaManager();
    expect(subject.schemaNames).toMatchSnapshot();
    expect(subject.sections).toMatchSnapshot();
  });
});

describe('SchemaManager.parse', () => {
  let subject: SchemaManager;
  beforeEach(() => {
    subject = new SchemaManager(schemaString);
  });

  it('Knows when a section is not in spec', () => {
    const expectedError = 'Invalid top level section "ambitions" provided,\
      it is not part of the schema; only the following are accepted: \
      basics, bar, foo'.replace(
      /\s+/g,
      ' ',
    );
    expect(() => {
      // @ts-ignore
      subject.parse('WhateverGoes', 'ambitions', {});
    }).toThrowError(expectedError);
  });

  it('Returns a JSON string ONLY when valid', () => {
    const basicsSectionYaml = `
# Comments ignored
name: John Doe
label: Software Developer
drivingLicenseClasses:
- 5
    `;
    const parsed = subject.parse('WhateverGoes', 'basics', basicsSectionYaml);
    expect(parsed).toBe(
      // Notice drivingLicenseClasses does not exist, because JSONSchema
      // has additionalProperties to allow that.
      '{"name":"John Doe","label":"Software Developer","drivingLicenseClasses":[5]}',
    );
    expect(typeof parsed).toBe('string');
    expect(JSON.stringify(parsed)).toMatchSnapshot();
  });

  it('Does not enforce required fields, but this seems like a limitation of ZSchema', () => {
    const basicsSectionYaml = `
# Notice there is no required "name" property
label: Software Developer
    `;
    /**
     * Error will look like this
     * ```
     * Invalid top level section "basics" provided, it is not part of the schema;
     * - code: OBJECT_MISSING_REQUIRED_PROPERTY
     *   params:
     *     - name
     *   message: "Missing required property: name"
     *   path: "#/basics"
     *   schemaId: WhateverGoes
     *
     * the contents has inconsistencies with the schema.
     * ```
     */
    expect(() => {
      subject.parse('WhateverGoes', 'basics', basicsSectionYaml);
    }).toThrowError(/Missing required property: name/);
  });
});

describe('SchemaManager.generateTypingsFileContents Generates TypeScript typings', () => {
  it('Defaults to JSONResume', async () => {
    const subject = new SchemaManager();
    const schema = await subject.generateTypingsFileContents('ResumeSchema');
    expect(schema).toMatchSnapshot();
  });
  it('Can serve own schema', async () => {
    const subject = new SchemaManager(schemaString);
    const schema = await subject.generateTypingsFileContents('WhateverGoes');
    expect(schema).toMatchSnapshot();
  });
});

describe('SchemaManager.getSchema', () => {
  it('Is possible to get one schema', async () => {
    const subject = new SchemaManager(schemaString);
    const schema = await subject.getSchema('WhateverGoes');
    expect(schema).toMatchSnapshot();
    expect(schema).toHaveProperty('id', 'WhateverGoes');
    expect(schema).toHaveProperty('title', 'Whatever Goes');
  });
});
