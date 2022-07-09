# express-passport-sequelize

### Application uses
- `express` as a web framework
- `passportjs` for authentication 
- `sequelize` for db interaction
- `jest` for tests

Launches on http://localhost:3000/ by default, documentation is available on http://localhost:3000/v1/api-docs/

Admin with credentials `admin`/`password` is created by default to provide access for user/schedule management

Environment is configured in `.dev.development`, `.dev.production`, `.env.test` for each environment correspondingly

**Important:** database is re-created on every launch for `development` and `test` environment and persisted for `production` environment. 

_PS. Ensure you have docker installed on your machine before running the application_
### Run in production mode
```
yarn
yarn docker:up
```

### Run in development mode
```
yarn docker:db
yarn dev
```

### Run unit tests
```
yarn test
```