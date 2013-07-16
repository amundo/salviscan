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

    if(app.date == null){
      var diff = new Date().getTime() - new Date(timeToSeconds($('#clock input').val())).getTime();
      app.date = new Date(diff);
    } 

    function updateClock(){ 
      var current = new Date(new Date().getTime() - app.date.getTime());
      $('#clock input').val(secondsToTime(current.getTime()))
    }

    app.clockRef = setInterval(updateClock, 500);
  })

  $('#stopTimer').on('click', function(){ 
    app.date = null;
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
    annotations = JSON.parse(localStorage.lynnette);

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
    annotation.end = app.date.getTime(); 
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
