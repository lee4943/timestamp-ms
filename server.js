// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/*", function(req, res) {
  var url = req.url.substring(1);
  var result = convertTimeDate(url);
  res.send(result);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

function convertTimeDate(url) {
  var result = {'unix': null, 'natural': null};
  
  var desanitizedUrl = decodeURIComponent(url);
  if (isNaN(desanitizedUrl) === false) {
        desanitizedUrl = parseInt(desanitizedUrl) * 1000;
      }
  
  var unknownDate = new Date(desanitizedUrl);
  
  if (unknownDate.toString() === 'Invalid Date') {
    return result;
  }
  
  var options = { year: 'numeric', month: 'long', day: 'numeric' };
  result.natural = unknownDate.toLocaleDateString('en-US', options);
  result.unix = (unknownDate.getTime() / 1000);
  
  return result;
}