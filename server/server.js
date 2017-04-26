var express = require('express');
const app = express();

var request = require('request');

var bodyParser = require('body-parser');
app.use(bodyParser.json())



app.all('*',function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
  next();}
);



app.get('/random', function(req, res){
  const spaceTerms = ['mars%20rover','moon', 'super%20nova' ,'nebula', 'galaxy', 'planets', 'star', 'neptune', 'comet', 'earth', 'iss', 'hubble', 'jupiter', 'mars', 'venus', 'saturn', 'black%20hole', 'asteroid'];
  const chosenT = spaceTerms[Math.floor(Math.random() * (spaceTerms.length-1))];
  const nasa = `https://images-api.nasa.gov/search?q=${chosenT}&page=1&media_type=image&year_start=1920&year_end=2017`;
 
  request(nasa, function (error, response, body) {
    if(error){
      res.send(error);
    }
    res.send(body)
  });
});

app.post('/image', function(req, res){
  // res.send(req.body.nasa_id);
  request(`https://images-assets.nasa.gov/image/${req.body.nasa_id}/collection.json`, function(error, response, body){
    if (error){
      res.send(error)
    }
    res.send(body[0]);
  })
})

app.post('/search/', function(req, res){
  var searchTerm = req.body.searchTerm.replace(' ', '%20');
  // res.send(searchTerm);
  const nasa = `https://images-api.nasa.gov/search?q=${searchTerm}&page=1&media_type=image&year_start=1920&year_end=2017`;
 
  request(nasa, function (error, response, body) {
    if(error){
      res.send(error);
    }
    res.send(body)
  });

})

app.listen(8180);