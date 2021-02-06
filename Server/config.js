module.exports = {
  jwt: {
    accessSecret: "mysecret-dfgd4g43f3tfok3n3",
    refreshSecret: "mysecret-lkm13diaxyz042w64",
  },
  port: 5000,
  mongooseUrl: 'mongodb+srv://admin:KhPlborEBSxHWYlj@cluster0.iduaz.mongodb.net/betanote?retryWrites=true&w=majority',
  cors: {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
    allowedHeaders: ['Content-Type'],
    credentials: true
  },
  cookieSecret: 'secretkey-lc3bh532b'
}