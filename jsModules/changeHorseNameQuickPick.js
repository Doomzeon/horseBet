const countOBJ=require(__dirname+'/getSizeOfObject.js');

exports.getArrayNameHorses= function(race){
  var arrayHorses=createArrayHorses(race.Horses,race);
//console.log(arrayHorses);
  return arrayHorses;
}

function createArrayHorses(horses,race){
  var arrayHorses=[];
  for(var horse in horses){
    var nameHorse={
      nameHorse:horses[horse].horse,
      nameJock:horses[horse].jockey,
      steccato:horses[horse].steccato,
      label:horses[horse].draw_label,
      img:getNameOfImage(horse,horses),
    };
    arrayHorses.push(nameHorse);

  }
  arrayHorses.push({raceComment:race.Data.tip,metadata:race.Data.metadata,title:race.Data.title,ranking:race.Data.timeform});

console.log(arrayHorses);
  return arrayHorses
}

function getNameOfImage(horse,horses){
  var horseName=horse;
  var jokceyName=horses[horse].jockey;
  var splitelem= jokceyName.split(' ');
  var finalString=''+horse+'-';
  //console.log(splitelem);
  for(var i=0;i<splitelem.length;i++){

    if(splitelem[i]!=''){
      if(i+2==splitelem.length){
        finalString+=splitelem[i];
      }else{
        finalString+=splitelem[i]+'_';
      }
    }
  }
  finalString+='.png';
  return finalString;
}
