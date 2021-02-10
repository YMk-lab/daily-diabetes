export const environment = {
  production: false,
  server: {
    port: 3333,
    globalPrefix: 'api',
    jwt: {
      access: {
        secretKey: 'mySuperSecretKey',
      },
      refresh: {
        secretKey: 'mySuperSecretRefreshKey',
      }
    },
    db: {
      host: 'mongodb://127.0.0.1',
      port: '27017',
      name: 'daily-diabetes'
    }
  },
  client: {
    host: 'http://localhost:4200'
  }
};
