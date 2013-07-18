app = {};

function show(obj){ console.log(JSON.stringify(obj, null, 2))}

$(function(){

 var $ta = $('textarea#annotation');
      ta = $ta.get(0),
     $ul = $('ul'),
     $exporter = $('#exporter'),
     $exportButton = $('#exportButton'),
     $closeExportButton = $('#closeExportButton'),
      annotations = [];
 
  function renderExport(annotations){
    var output = '';
    for(var i=0; i<annotations.length; i++){
      var annotation = annotations[i];
      output += [secondsToTime(annotation.start),secondsToTime(annotation.end),annotation.annotation].join("\t") + "\n";
    }
    return output;
  }
 
  $('#startTimer').on('click', function(ev){

    if(app.takeoff == null){
      var takeoff = timeToSeconds($('#clock input').val());
      app.date = new Date(takeoff);
    } 

    function updateClock(){ 
      var currentSeconds = new Date().getTime()/1000 - app.date.getTime()/1000;
      var currentDate = new Date(currentSeconds);
      console.log(currentDate);
      console.log(currentDate.getTime());
      $('#clock input').val(secondsToTime(currentDate.getTime()));
    }

    app.clockRef = setInterval(updateClock, 500);
  })

  $('#stopTimer').on('click', function(){ 
    app.takeoff = null;
    clearInterval(app.clockRef) 
  }); 

  $exportButton.on('click', function(ev){

     $exporter.css('visibility', 'visible');
     $exporter.find('textarea').val(renderExport(annotations));
     
  })
 
 $closeExportButton.on('click', function(ev){
     $exporter.css('visibility', 'hidden');
 })

 $('#reloadButton').on('click', function(ev){
    if (localStorage.lynnette){
      annotations = JSON.parse(localStorage.lynnette);
    }

    $ul.html('');

    for(var i=0;i<annotations.length;i++){
      var annotation = annotations[i];
      $ul.append('<li><small> [' + secondsToTime(annotation.end) + ']</small> ' + annotation.annotation + '</li>');
      ta.value = '';
      $('#clock input').val(annotations.slice(-1)[0].end);
    }
  
 })

 $ta.on('keyup', function(ev){

  if( ev.which == 13){
  
    var annotation = {};

    annotation.end = timeToSeconds($('#clock input').val()); 
    var end = secondsToTime(app.date.getTime()); 
    annotation.end = secondsToTime(app.date.getTime()); 
    annotation.annotation = ta.value.trim();

    if(annotations.length == 0){
      annotation.start = 0;
      annotations.push(annotation);
    } else { 
      annotation.start = _.last(annotations).end;
      annotations.push(annotation);
    }
    
    localStorage.lynnette = JSON.stringify(annotations,null,2);

    $ul.append('<li><small> [' + annotation.end + ']</small> ' + annotation.annotation + '</li>');
    ta.value = '';

  };

 })


})
