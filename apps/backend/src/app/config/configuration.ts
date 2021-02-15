export default () => ({
  globalPrefix: process.env.SERVER_GLOBAL_PREFIX,
  port: parseInt(process.env.PORT, 10) || 3333,
  client: {
    host: process.env.CLIENT_URI
  }
})
