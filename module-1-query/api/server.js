var express = require('express');
var app = express();
var fs = require("fs");

app.get('/people', function (req, res) {
   fs.readFile( __dirname + "/" + "people.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
   });
})

app.get('/people/:id', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "people.json", 'utf8', function (err, data) {
       people = JSON.parse( data );
       var person = people.people[req.params.id - 1];
       console.log( person );
       // res.end( JSON.stringify(person));
       res.json( person);
   });
})


var server = app.listen(8000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})

