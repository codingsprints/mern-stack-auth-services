DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

CREATE TYPE users_role_enum AS ENUM ('customer','admin','manager');
