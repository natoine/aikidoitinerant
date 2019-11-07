const port     = process.env.PORT || 8080

var express = require("express")
var fetchUrl = require("fetch").fetchUrl
var cheerio = require('cheerio')
var cors = require('cors')
var fs = require('fs')
var path = require('path')
var dateFormat = require('dateformat')

const rscsFolder = path.join(__dirname, 'rsc')

var app = express()

app.use(cors())

//générer une base des clubs de la FFAAA
function initFFAAA()
{
    //console.log("init FFAAA", "initiating FFAAA")
    var url = "https://www.aikido.com.fr/trouver-un-club/?rid_discipline=2"
    fetchUrl(url , function(error, meta, body){
        var requestClubsFFAAA = {}

        var html = body.toString()
        var parsedHTML = cheerio.load(html)

        //get nb clubs
        var textNbClubs = parsedHTML(".listing_clubs").first().find('h3').first().text()
        var nbclubs = textNbClubs.split('(')[1].split(' ')[0].trim()
        requestClubsFFAAA.date = dateFormat(new Date(),"yyyy-mm-dd-h-MM-ss")
        requestClubsFFAAA.clubs_length = nbclubs

        console.log("requestClubsFFAAA", requestClubsFFAAA)
        var filename = `requestClubsFFAAA_${requestClubsFFAAA.date}.json`
        var fileResult = path.join(rscsFolder, filename)
        fs.writeFile(fileResult, JSON.stringify(requestClubsFFAAA), function(){console.log("file should be created", filename)})
    })
}

initFFAAA()


app.get('/', function (req, res) {
    res.send(`Hello, vous êtes à la racine de ce serveur dédié à la pratique de l'aikido en itinérance !`)
  })

  app.listen(port, function () {
    console.log(`aikido itinerant deployed on PORT : ${port}`)
  })