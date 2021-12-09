## Awesome Project Build with TypeORM

Steps to run this project:
# Pré-requis : python

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file if needed
3. Run migrations with `npm run migration:run` if needed
3. Run `npm start` command

# How authentication works

1. Get token from : `localhost:3000/auth/login`
2. Put token in headers of requests like : `auth = {token}`
