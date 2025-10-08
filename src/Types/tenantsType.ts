import { Request } from 'express';

//create tenants
export interface ICreateTenants {
  name: string;
  address: string;
}

export interface tenantRequest extends Request {
  body: ICreateTenants;
}

export interface ITenantCreateDto {
  id: number;
  name: string;
  address: string;
}

export interface ITenantCreateResObject {
  code: number;
  status: string;
  message: string;
  data: {
    tenantCreateDto: ITenantCreateDto;
  };
  error: boolean;
}

//get all tenants
export interface TenantQueryParams {
  q: string;
  perPage: number;
  currentPage: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}
export interface IGetAllTenantsDto {
  id: number;
  name: string;
  address: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface ITenantGetAllResObject {
  code: number;
  status: string;
  message: string;
  data: {
    tenantGetAllDto: IGetAllTenantsDto[];
    currentPage: number;
    perPage: number;
    total: number;
  };
  error: boolean;
}

//get tenant by id
export interface ITenantGetByIdResObject {
  code: number;
  status: string;
  message: string;
  data: {
    tenantGetByIdDto: IGetAllTenantsDto;
  };
  error: boolean;
}

//delete tenant

export interface IDeleteTenantDto {
  id: number;
  name: string;
  address: string;
}
export interface ITenantDeleteResObject {
  code: number;
  status: string;
  message: string;
  data: {
    tenantDeleteDto: IDeleteTenantDto;
  };
  error: boolean;
}

//update tenant
export interface IUpdateTenantDto {
  id: number;
  name: string;
  address: string;
}
export interface ITenantUpdateResObject {
  code: number;
  status: string;
  message: string;
  data: {
    tenantUpdateDto: IUpdateTenantDto;
  };
  error: boolean;
}
