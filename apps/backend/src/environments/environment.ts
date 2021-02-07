export const environment = {
  production: false,
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
