export const Roles = {
  CUSTOMER: 'customer',
  ADMIN: 'admin',
  MANAGER: 'manager',
} as const;

export const saltRounds = 10;

export const NODE_ENV_VAL = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
  TEST: 'test',
};

export const allowedUserSortFields = [
  'user.id',
  'user.userName',
  'user.firstName',
  'user.lastName',
  'user.email',
  'user.role',
  'user.createdAt',
  'user.updatedAt',
];

export const allowedTenantsSortFields = [
  'tenant.id',
  'tenant.name',
  'tenant.address',
  'tenant.createdAt',
  'tenant.updatedAt',
];
