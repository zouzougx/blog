export default {
  version: '1.0',
  type: 'object',
  properties: {
    a: {
      version: '1.0',
      key: 'a',
      type: 'string',
      enum: [
        {
          label: 'visible',
          value: true,
        },
        {
          label: 'hidden',
          value: false,
        },
      ],
      name: 'a',
      title: 'A',
      'x-component': 'select',
    },
    b: {
      version: '1.0',
      key: 'b',
      type: 'string',
      enum: [
        {
          label: 'visible',
          value: true,
        },
        {
          label: 'hidden',
          value: false,
        },
      ],
      name: 'b',
      title: 'B',
      'x-component': 'select',
    },
    c: {
      version: '1.0',
      key: 'c',
      type: 'string',
      name: 'c',
      title: 'C',
      'x-component': 'input',
    },
  },
};
