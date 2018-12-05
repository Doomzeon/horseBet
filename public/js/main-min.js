

var oldClassQuickPick="";
$(document).ready(function(){
  $('.modalSignIn').hide();
  $('.quickPickButton').on('click', function () {
    if($('.quickPickButton').text()=="Go to single Run"){
      $('.scheduleSection').hide();
      $('.singleBetTable').show();
      $('.quickPickButton').text('Go to Quick Pick');
    }else{
      $('.scheduleSection').show();
      $('.singleBetTable').hide();
      $('.quickPickButton').text('Go to single Run');
    }
  });

//cambio dei elementi della tabella quick pick al click della quota

  $(".tableButton").click(function(){
    var allClass=$(this).attr('class').split(' ');
    controllClass(allClass[0]);
});

//    fine
//      switch to single pick or quick Pick
  $('.changeSingleQuick').click(function(){
    if($(this).text()=="Go to single Run"){
      $(this).text("Go to quick Pick");
      $('.quickPickTable').hide();
      $('.singleBetTable').show();
    }else if($(this).text()=="Go to quick Pick"){
      $(this).text("Go to single Run");
      $('.quickPickTable').show();
      $('.singleBetTable').hide();
    }
  });
//      FINE


// al click della pagination cambiare le gare
$(".pagination").on("click", ".page-item", function(event){
    var allClass=$(this).attr('class').split(' ');
    controllClass(allClass[1]);
    if($('.singleBetTable').is(':visible')){
      sendRequestGetSinglePick(allClass[1]);
    }

});

//fine

});




//      eventuali controlli sulla classe del bottone/pagination
function controllClass(classe){
  if(oldClassQuickPick==""){
    oldClassQuickPick=classe;
    sendRequest(classe);
  }else if(oldClassQuickPick!=classe){
    sendRequest(classe);
    oldClassQuickPick=classe;
  }
}
//      FINE


function sendRequestGetSinglePick(classe){
  $('.bodySinglePick').html(' ');
  var codice='<tr>'+
      '<th colspan="2" style="width: 10%">#'+
          '<br /> Draw'+
      '</th>'+
      '<th style="width: 20%">Horse'+
          '<br />Recent Form'+
      '</th>'+
      '<th style="width: 20%">Jockey'+
          '<br />Trainer'+
      '</th>'+
      '<th style="width: 12%">Age</th>'+
      '<th style="width: 12%">Weight'+
          '<br /> (OR)'+
      '</th>'+
      '<th style="width: 10%">Previous Odds</th>'+
      '<th style="width: 6%">Win</th>'+
      '<th style="width: 6%">Place</th>'+
  '</tr>';
  $.post("/getHtmlTableSinglePick",
    {
      gara:classe
    },function(data, status){
      codice+=data;
      $('.bodySinglePick').append(codice);
    });
}



//      richiesta dei elementi da cambiare riguardanndo la tabella quickpick
function sendRequest(classe){
  $.post("/getJson",
  {
    gara:classe
  },
   function(data, status){
    $('.columnHorseNameQuickPick').text('');
    $('.columnStecattoLabelQuickPick').text('');
    $('.columnImgQuickPick').html('');
    $('#raceComment').text('');
    $('.Infos').html('');

    $('.pagination').find('.active').removeClass('active');
    $('.timeFormRun').find('.nameHorse').text('');
    $('.timeFormRun').find('.starsHorse').html('');

    var td=$('.horseTable').find('.firstChoice').get();
    $.each(td,function(){
      $(this).removeClass('firstChoice');
      $(this).addClass('secondChoice');
    });
    var td=$('.horseTable').find('.'+classe).get();
    $.each(td,function(){
      $(this).removeClass('secondChoice');
        $(this).addClass('firstChoice');
    });
    for(var i=0;i<data.length-1;i++){
      $('.columnStecattoLabelQuickPick.'+i+'td').html(data[i].steccato+'</b><br>'+data[i].label);
      $('.columnImgQuickPick.'+i+'td').html('<img src="/img/'+data[i].img+'" >');
      $('.columnHorseNameQuickPick.'+i+'td').html('<b>'+data[i].nameHorse+'</b><br>'+data[i].nameJock);
    }

    for(var i=0;i<3;i++){
      $('.timeFormRun').find('.nameHorse'+i).text(data[data.length-1].ranking[i].horse_name);
      if(data[data.length-1].ranking[i].rating==5){
        $('.timeFormRun').find('.starsHorse'+i).html('<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span>');
      }else if(data[data.length-1].ranking[i].rating==4){
        $('.timeFormRun').find('.starsHorse'+i).html('<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span>');
      }else if(data[data.length-1].ranking[i].rating==3){
        $('.timeFormRun').find('.starsHorse'+i).html('<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span>');
      }
    }
    $('.pagination').find('.'+classe).addClass('active');
    $('#raceComment').text(data[data.length-1].raceComment);
    $('.Infos').html('<img src="./img/en.jpg" alt="flag" width="35" height="22">'+data[data.length-1].title+' <span class="secondPartInfos">'+data[data.length-1].metadata+'</span>');
  });
}
//            FINE
