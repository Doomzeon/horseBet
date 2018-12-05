const countOBJ=require(__dirname+'/getSizeOfObject.js');

exports.getHtml= function(races){
  var codice=createHtmlTableHorsesSingle(races.Horses);
  return codice;
}

function createHtmlTableHorsesSingle(horses){
  var codiceHtml='';
  for(var horse in horses){
    codiceHtml+='<tr>'+
      '<td>'+horses[horse].steccato+'<br>'+horses[horse].draw_label+'</td>'+
      '<td><img src="/img/'+getNameOfImage(horse,horses)+'"></td>'+
      '<td>'+horses[horse].horse+'</td>'+
      '<td>'+horses[horse].jockey+'</td>'+
      '<td>'+horses[horse].age+'</td>'+
      '<td>'+horses[horse].weight+'</td>'+
      '<td>'+horses[horse].previous_odds+'</td>'+
      '<td><button class=" btn tableButton gb1 active firstChoice <%=horseTableInfo[0].race%>" onclick="">'+horses[horse].odds['win']+'</button></td>'+
      '<td><button class=" btn tableButton gb1 active firstChoice <%=horseTableInfo[0].race%>" onclick="">'+horses[horse].odds['3 Places']+'</td>'+
  '</tr>';
  }
  return codiceHtml;
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
