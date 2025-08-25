DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

CREATE TYPE users_role_enum AS ENUM ('customer','admin','manager');

docker build -t my-auth-service-prod:latest -f .\docker\production\Dockerfile .

docker run -it --env-file "${pwd}/.env.prod" -p 5001:5001 my-auth-service-prod:latest

new testing
