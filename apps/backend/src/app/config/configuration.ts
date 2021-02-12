export default () => ({
  globalPrefix: process.env.SERVER_GLOBAL_PREFIX,
  port: parseInt(process.env.PORT, 10) || 3333,
  client: {
    host: process.env.CLIENT_URI
  },
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    name: process.env.DATABASE_NAME
  },
  jwt: {
    accessToken: {
      secret: process.env.ACCESS_TOKEN,
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES,
    },
    refreshToken: {
      secret: process.env.REFRESH_TOKEN,
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES
    }
  }
})
