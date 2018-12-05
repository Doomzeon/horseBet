const express= require('express');
const app= express();
//              modules
const scheduleTable=require(__dirname+'/jsModules/createStateSelector_ScheduleTable.js');
const countOBJ=require(__dirname+'/jsModules/getSizeOfObject.js');
const hourPagination=require(__dirname+'/jsModules/createHourPagination.js')
const request = require('request');
//              fine

let serverEndpoint = "https://54.71.183.16/";

var jsonDataScheduleData;
var jsonDataMatches;

app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));

app.get('/', function(req,res){
  sendRequestsJSONFile();
  //hourPagination.createStateSelector(jsonDataMatches);
  var arraySTHOUR=scheduleTable.StadiumHours(jsonDataScheduleData.races);
  var d =Object.entries(jsonDataMatches.races['GB-20181026-0'].Horses);
  console.log(d[0]);

  res.render('index',{
    arraySTH:arraySTHOUR,
    country:jsonDataScheduleData.country,
    jsonDataMatches:jsonDataMatches,
    sizeOfRaces:countOBJ.count(jsonDataMatches.races)
     });

});

app.listen(8080, function () {
  console.log('Server in ascolto sulla porta 8080');
  sendRequestsJSONFile();
});



async function sendRequestsJSONFile() {
    await new Promise((resolve, reject) => {
        setTimeout(() => {
          getJsonSchedule();
          getJSONMatches();
          resolve();
        }, 0);
    });
}
function getJSONMatches(){
  request({
    url: serverEndpoint+'getRaces?light=0&lim=1',
    agentOptions: {
    rejectUnauthorized: false
    }
  }, function (err, resp, body) {
    console.log('error: ', err);
    jsonDataMatches=JSON.parse(body);
  }).end();
}
function getJsonSchedule(){
  request({
    url: serverEndpoint+'getRaces?light=1&lim=0',
    agentOptions: {
    rejectUnauthorized: false
    }
  }, function (err, resp, body) {
    console.log('error: ', err);
    jsonDataScheduleData=JSON.parse(body);
  }).end();
}
