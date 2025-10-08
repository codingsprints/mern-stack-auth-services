import express from 'express';
import {
  deleteTenant,
  getAllTenants,
  getTenantById,
  tenantCreate,
  updateTenant,
} from '../controllers/TenantsController';
import tenantsValidator from '../Validator/tenants-validator';
import { validate } from '../Validator/ValidationChain';
import authenticate from '../middlewares/authenticate';
import { Roles } from '../Types';
import { canAccess } from '../middlewares/canAccess';
import listTenantsValidator from '../Validator/list-tenants-validator';

const router = express.Router();

router.post(
  '/',
  authenticate,
  canAccess([Roles.ADMIN]),
  validate(tenantsValidator),
  tenantCreate,
);
router.patch(
  '/:id',
  authenticate,
  canAccess([Roles.ADMIN]),
  validate(tenantsValidator),
  updateTenant,
);
router.get('/', listTenantsValidator, getAllTenants);
router.get('/:id', authenticate, canAccess([Roles.ADMIN]), getTenantById);
router.delete('/:id', authenticate, canAccess([Roles.ADMIN]), deleteTenant);

export default router;
