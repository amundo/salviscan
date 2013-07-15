app = {};

function show(obj){ console.log(JSON.stringify(obj, null, 2))}

function timeToSeconds(time){
  parts = time.split(':');
  seconds = parseInt(parts[2]); 
  minutes = parseInt(parts[1]);
  hours = parseInt(parts[0]); 

  var converted = (hours * 60 * 60) + (minutes * 60) + seconds;
  return converted;
}

function secondsToTime(secs){
    var hours = Math.floor(secs / (60 * 60));

    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);

    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}

    var stamp = {
        "h": hours,
        "m": minutes,
        "s": seconds
    };

    return [stamp.h, stamp.m, stamp.s].join(':');
}


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
    var  offset = timeToSeconds($('#clock input').val());

    app.timer = new Timer();

    if(offset>0){
      app.timer.addTime(offset) 
    }

    function updateClock(){ 
      $('#clock input').val(app.timer.current())
    }

    app.clockRef = setInterval(updateClock, 500);
  })

  $('#stopTimer').on('click', function(){ clearInterval(app.clockRef) }); 

  $exportButton.on('click', function(ev){

     $exporter.css('visibility', 'visible');
     $exporter.find('textarea').val(renderExport(annotations));
     
  })
 
 $closeExportButton.on('click', function(ev){
     $exporter.css('visibility', 'hidden');
 })

 $ta.on('keyup', function(ev){

  if( ev.which == 13){
  
    var annotation = {};

    annotation.end = timeToSeconds($('#clock input').val()); 
    annotation.annotation = ta.value.trim();

    if(annotations.length == 0){
      annotation.start = 0;
      annotations.push(annotation);
    } else { 
      annotation.start = _.last(annotations).end;
      annotations.push(annotation);
    }
    
    localStorage.lynnette = JSON.stringify(annotations,null,2);

    $ul.append('<li><small> [' + secondsToTime(annotation.end) + ']</small> ' + annotation.annotation + '</li>');
    ta.value = '';

  };

 })


})
