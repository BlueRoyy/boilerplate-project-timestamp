// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date", function (req, res) {

  const id = req.params.date;
  const timestamp = new Date(id);
  const unixTimestamp = new Date(id * 1000);

  if (!isNaN(timestamp)){
    res.json({
      unix: Number(Math.floor(timestamp.getTime()/1000)),
      utc: timestamp.toUTCString()
    });
  } else if (!isNaN(unixTimestamp)){
      res.json({
        unix: Number(id),
        utc: unixTimestamp.toUTCString()
      });
  } else {
      res.json({Error:"Invalid Date"});
  }
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
