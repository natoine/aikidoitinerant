const port     = process.env.PORT || 8080

var express = require("express")/* npm install express */
var cheerio = require('cheerio')
var cors = require('cors')

var app = express()

app.use(cors())

app.get('/', function (req, res) {
    res.send(`Hello, vous êtes à la racine de ce serveur dédié à la pratique de l'aikido en itinérance ! allez voir /index`)
  })

  app.listen(port, function () {
    console.log(`deploy on PORT : ${port}`)
  })