const { DB_HOST } = process.env;

module.exports = {
  database: {
    host: DB_HOST || '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'nodejs',
  },
  session: {
    secret: 'MyS3sSi10n',
  },
};
