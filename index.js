const port     = process.env.PORT || 8080

var express = require("express")
var fetchUrl = require("fetch").fetchUrl
var cheerio = require('cheerio')
var cors = require('cors')

var app = express()

app.use(cors())

//générer une base des clubs de la FFAAA
function initFFAAA()
{
    //console.log("init FFAAA", "initiating FFAAA")
    var url = "https://www.aikido.com.fr/trouver-un-club/?rid_discipline=2"
    fetchUrl(url , function(error, meta, body){
        var html = body.toString()
        var parsedHTML = cheerio.load(html)

        //get nb clubs
        var textNbClubs = parsedHTML(".listing_clubs").first().find('h3').first().text()
        var nbclubs = textNbClubs.split('(')[1].split(' ')[0].trim()
        
    })
}

initFFAAA()


app.get('/', function (req, res) {
    res.send(`Hello, vous êtes à la racine de ce serveur dédié à la pratique de l'aikido en itinérance !`)
  })

  app.listen(port, function () {
    console.log(`aikido itinerant deployed on PORT : ${port}`)
  })