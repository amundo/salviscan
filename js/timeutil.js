function timeToSeconds(time){
  /* convert an hh:mm:ss timestamp to an integer number of seconds */
  //if(typeof(time) != 'string')
  //  throw new Error('timeToSeconds requires a string, gave ' + typeof(time) + ':' + time)
  if(typeof(time) != 'string') time = String(time);
  parts = time.split(':');
  seconds = parseInt(parts[2]); 
  minutes = parseInt(parts[1]);
  hours = parseInt(parts[0]); 

  var seconds = (hours * 60 * 60) + (minutes * 60) + seconds;
  //var milliseconds = 1000 * seconds;
  if(typeof(seconds) != 'number')
    throw new Error('timeToSeconds should return a number but it did not: ' + seconds + typeof(seconds))
  return seconds;
}


function secondsToTime(seconds) {
  var hh = Math.floor(seconds / 3600);
  var mm = Math.floor((seconds - (hh * 3600)) / 60);
  var ss = seconds - (hh * 3600) - (mm * 60);

  if (hh < 10) {hh = '0' + hh}
  if (mm < 10) {mm = '0' + mm}
  if (ss < 10) {ss = '0' + ss}

  return hh + ':' + mm + ':' + ss;
};

function oldSecondsToTime(secs){
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

