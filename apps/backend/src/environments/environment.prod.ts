export const environment = {
  production: true,
  server: {
    port: 3333,
    globalPrefix: 'api',
    jwt: {
      secretKey: 'mySuperSecretKey'
    }
  },
  client: {
    host: 'http://localhost:4200'
  }
};
