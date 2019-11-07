const port     = process.env.PORT || 8080

var express = require("express")
var fetchUrl = require("fetch").fetchUrl
var cheerio = require('cheerio')
var cors = require('cors')
var fs = require('fs')
var path = require('path')
var dateFormat = require('dateformat')
var promisify = require('util').promisify

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

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
        writeFile(fileResult, JSON.stringify(requestClubsFFAAA)).then(function()
        {
            console.log("file should be created", filename)
            return filename
        })
    })
}

var latestFile = initFFAAA()
console.log("latestFile", latestFile)

app.get('/', function (req, res) {
    if(latestFile)
    {
        readFile(latestFile).then(function(data){
            var latestFFAAAdata = JSON.parse(data)
            res.send(`Hello, vous êtes à la racine de ce serveur dédié à la pratique de l'aikido en itinérance ! 
            D'après le site de la FFAAA en date du ${latestFFAAAdata.date} il y a ${latestFFAAAdata.clubs_length} clubs en France.`)
        })
    }
    else
    {
        res.send(`pas possible de lire le dernier fichier... ${latestFile}`)
    }
  })

  app.listen(port, function () {
    console.log(`aikido itinerant deployed on PORT : ${port}`)
  })