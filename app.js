//              modules
const express= require('express');
const app= express();
const engine= require('ejs-locals');
const scheduleTable=require(__dirname+'/jsModules/createStateSelector_ScheduleTable.js');
const countOBJ=require(__dirname+'/jsModules/getSizeOfObject.js');
const request = require('request');
const horseTable=require(__dirname+'/jsModules/horseTable.js');
const changeHorseNameQuickPick=require(__dirname+'/jsModules/changeHorseNameQuickPick.js');
var bodyParser = require("body-parser");
var http = require('http').Server(app);
var io = require('socket.io')(http);
var createSingleBetHtml=require(__dirname+'/jsModules/createSingleBetHtml.js');
//              end   createSingleBetHtml

//              variables
let serverEndpoint = "https://54.71.183.16/";
var jsonDataScheduleData;
var jsonDataMatches;
var arraySTH;
var country;
var sizeOfRaces;
var horseTableInf;
//              end

app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname+'/public'));

app.get('/',  function(req,res){
  //console.log(horseTableInf);
  res.render('provaLayout',{
    arraySTH:arraySTH,
    country:country,
    jsonDataMatches:jsonDataMatches,
    sizeOfRaces:sizeOfRaces,
    horseTableInfo:horseTable.sizesOfRaces(jsonDataMatches.races)
  });

  io.on('connection', function(socket){
  console.log('a user connected');
});
  /*res.render('index',{
    arraySTH:arraySTH,
    country:country,
    jsonDataMatches:jsonDataMatches,
    sizeOfRaces:sizeOfRaces,
    horseTableInfo:horseTable.sizesOfRaces(jsonDataMatches.races)
  });*/
});

app.post('/getHtmlTableSinglePick', function(req,res){
  var d=createSingleBetHtml.getHtml(jsonDataMatches.races[req.body.gara]);
  res.send(d);
  //console.log('request');
});

app.post('/getJson', function(req,res){
  var d=changeHorseNameQuickPick.getArrayNameHorses(jsonDataMatches.races[req.body.gara]);
  res.send(d);
});


app.listen(8080,async function () {
  console.log('Server in ascolto sulla porta 8080');
  await sendRequest(serverEndpoint+'getRaces?light=0&lim=1').then(function(json){
    jsonDataMatches=json;
  });
  await sendRequest(serverEndpoint+'getRaces?light=1&lim=0').then(function(json){
    jsonDataScheduleData=json;
  });
  arraySTH=scheduleTable.StadiumHours(jsonDataScheduleData.races);
  country=jsonDataScheduleData.country;
  sizeOfRaces=countOBJ.count(jsonDataMatches.races);
  horseTableInf=horseTable.sizesOfRaces(jsonDataMatches.races);
});

function sendRequest(url) {
    // Setting URL and headers for request
    var options = {
        url: url,
        agentOptions: {
          rejectUnauthorized: false
        }
    };
    // Return new promise
    return new Promise(function(resolve, reject) {
     // Do async job
        request.get(options, function(err, resp, body) {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(body));
            }
        })
    })
}
