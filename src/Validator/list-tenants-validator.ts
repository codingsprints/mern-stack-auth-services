import { checkSchema } from 'express-validator';

export default checkSchema(
  {
    q: {
      trim: true,
      customSanitizer: {
        options: (value: unknown) => value || '',
      },
    },
    sortBy: {
      customSanitizer: {
        options: (value: unknown) => (value ? String(value) : 'createdAt'), // default field
        // options: (value: unknown) => String(value), // default field
      },
    },
    sortOrder: {
      customSanitizer: {
        options: (value: unknown) => {
          const order = String(value || 'desc').toLowerCase();
          return ['asc', 'desc'].includes(order) ? order : 'asc'; // default asc
        },
      },
    },
    currentPage: {
      customSanitizer: {
        options: (value) => {
          const parsedValue = Number(value);
          return Number.isNaN(parsedValue) ? 1 : parsedValue;
        },
      },
    },
    perPage: {
      customSanitizer: {
        options: (value) => {
          const parsedValue = Number(value);
          return Number.isNaN(parsedValue) ? 6 : parsedValue;
        },
      },
    },
  },
  ['query'],
);
