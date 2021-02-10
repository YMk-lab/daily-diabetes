export const environment = {
  production: true,
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
    }
  },
  client: {
    host: 'http://localhost:4200'
  }
};
