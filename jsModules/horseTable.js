const countOBJ=require(__dirname+'/getSizeOfObject.js');

exports.sizesOfRaces= function(races){
  var raceTot= countOBJ.count(races);
  var totHorseRaces=[];
  for(var i=0;i<raceTot;i++){
    var info={
      race:'GB-20181026-'+i,
      horseTot:countOBJ.count(races['GB-20181026-'+i].Horses),
      arrayHorsesName:createArrayHorses(races['GB-20181026-'+i].Horses),
      currentHorse:0
    };
    totHorseRaces.push(info);
    findTotRace(races['GB-20181026-'+i].Horses);
  }
  var info={
    img:getNameOfImage(races['GB-20181026-0'].Horses)
  };
  totHorseRaces.push(info);
  var info={
    maxHorses:maxHorses
  };
  totHorseRaces.push(info);
  var info={
    totRaces:raceTot
  };
  totHorseRaces.push(info);
  return totHorseRaces;
}

function getNameOfImage(horses){
  var arrayHorsesFirstMatchName=createArrayHorses(horses);
  var arrayNamImage=[]
  for(var i=0;i<arrayHorsesFirstMatchName.length;i++){
    var jockey=horses[arrayHorsesFirstMatchName[i].name].jockey.split(' ');
    var nameJockey=jockey[0]+'_'+jockey[1];
    var info={
      img:arrayHorsesFirstMatchName[i].name+'-'+nameJockey+'.png'
    };
    arrayNamImage.push(info);
  }
  return arrayNamImage;
}

var maxHorses=0;
function findTotRace(horses){
  var num=countOBJ.count(horses);
  if(num>maxHorses)
    maxHorses=num;
}


function createArrayHorses(horses){
  var arrayHorses=[];
  for(var horse in horses){
    var nameHorse={
      name:horse
    };
    arrayHorses.push(nameHorse);
  }
  return arrayHorses
}
