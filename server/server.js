const jsonServer = require("json-server");
const apiServer = jsonServer.create();
const https = require("https");
import fs from "fs";

const path = require('path')
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
apiServer.use(middlewares)

const keyFile = path.join(__dirname, 'server-key')
const certFile = path.join(__dirname, 'server.cert')


https
  .createServer(
    {
      key: fs.readFileSync(keyFile),
      cert: fs.readFileSync(certFile),
    },
    server
  )
  .listen(3000, () => {
    console.log(
      'Go to https://localhost:3000/'
    );
  });

// define post actions
apiServer.use(jsonServer.bodyParser)
apiServer.use((req, res, next) => {
  if (req.method === 'POST') {
    res.cookie("cookie", "Hello I am authorized") 
  }
  next()
})

apiServer.post('/api/admin/signin', (req, res) => {
  res.cookie('uuid', '1', { signed: true, httpOnly: false })
})


// Use custom router
apiServer.use(router)
apiServer.listen(3001, () => {
  console.log('JSON Server is running')
})