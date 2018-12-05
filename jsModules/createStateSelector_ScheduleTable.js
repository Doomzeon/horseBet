const countOBJ=require(__dirname+'/getSizeOfObject.js');

exports.StadiumHours=  function(json){
  var is;
  var arrayStadium=[];
  for(var i=0;i<countOBJ.count(json);i++){
     is=json['GB-20181026-'+i].Data.title.split(' ');
    if(arrayStadium.length==0){
      var arrayStsTR={
        stadium:is[1],
        orari:[]
      };
      arrayStadium.push(arrayStsTR);
    }else{
      var controllo=true;
      for(var o=0;o<arrayStadium.length;o++){
        if(arrayStadium[o].stadium==is[1]){
          controllo=false;
        }
      }
      if(controllo!=false){
        var arrayStsTR={
          stadium:is[1],
          orari:[

          ]
        };
        arrayStadium.push(arrayStsTR);
      }
    }
  }
  for(var i=0;i<countOBJ.count(json);i++){
     is=json['GB-20181026-'+i].Data.title.split(' ');
     for(var o=0;o<arrayStadium.length;o++){
       if(arrayStadium[o].stadium==is[1]){
         var pos=arrayStadium[o].orari.length;
         //console.log(pos);
         arrayStadium[o].orari.push(is[0]);
       }
     }
  }
  //console.log(arrayStadium);
  return arrayStadium;
}

exports.createStateSel= function(json){

}
