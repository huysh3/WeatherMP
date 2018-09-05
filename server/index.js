const express = require('express')
const { PORT } = require('../config.server.json')
const app = express()
const test = require('./cloud-functions/test').main
var path = require('path')

app.listen(PORT, () => {
  console.log(`dev server start: http://127.0.0.1:${PORT}`)
})

app.use(
  '/static',
  express.static(path.join(__dirname, 'static'), {
    index: false,
    maxage: '30d'
  })
)

app.get('/api/test', (req, res, next) => {
  test(req.query).then(res.json.bind(res)).catch(e => {
    console.error(e)
    next(e)
  })
  // next()
})
