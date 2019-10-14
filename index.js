'use strict';

const express = require('express')
const app = express()
const port = 3001  

// ------------------------------------
//this function is to read POST values
// ------------------------------------
app.use (function(req, res, next) {
    var data='';
    req.setEncoding('utf8');
    req.on('data', function(chunk) { 
        data += chunk;
    });
    req.on('end', function() {
        req.body = data;
        next();
    });
});
//---------------------------------------


//test login
function CheckLogin(name, password)
{
  var usrname = "admin"
  var pwd = "admin123"
  if(name == usrname && password == pwd)
  {
    return true;
  }
  return false;
}

//test to write log
function writeLog(messageLog)
{
  var fs = require('fs');

  // check if directory exist
  if (!fs.existsSync('logs')) {
      fs.mkdirSync('logs'); // create new directory
  }

  //get timestamp
  let ts = Date.now();
  let date_ob = new Date(ts);
  let date = date_ob.getDate();
  let month = date_ob.getMonth() + 1;
  let year = date_ob.getFullYear();
  let hours = date_ob.getHours();
  let minutes = date_ob.getMinutes();
  let seconds = date_ob.getSeconds();

  let dateTimeFile =  year + "-" + month + "-" + date 
  let fullDateTimeStr = year + "-" + month + "-" + date + " " + hours  + ":" + minutes + ":" + seconds
  let logPath = 'logs\\'+ dateTimeFile +'.log'
  fs.appendFile(logPath,
  fullDateTimeStr + ' ' + messageLog + '\n', 
  function (err) 
  {
    if (err) throw err;
    console.log(messageLog);
  });
}

//======================================================================================
app.get('/', (req, res) => res.send('Express server running!'))

// GET method route
app.get('/test', function (req, res) {
    var value = req.body;
    res.send('GET request to the homepage:' + value)
  })
  
  // POST method route
  app.post('/test', function (req, res) {
    //res.send(req.body)
    var value = req.body;    
    
    writeLog('function test triggered.')
    //value = value + " Received";
    //res.json([{Result: value}]);  
    let receivedBuff = JSON.parse(value); 
    writeLog('post value received:' + value)
    
    res.send(receivedBuff.Phone + ' - ' + receivedBuff.Name)
    
  })

  app.get('/test1/name', function (req, res) {
    var value = req.body;
    res.send('GET request to the homepage:' + req.params.name)
  })


 //======================================================================================

  var result = CheckLogin("admin","admin123")
  console.log(result)

  writeLog('Application Started')
  console.log('log created')

  app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`)
)