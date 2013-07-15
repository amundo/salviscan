function Timer(options){

  var self = this;

  this.options = options || {};

  this.getTime = function(){
    return new Date().getTime()
  }
 
  console.log( this.options.start , this.getTime());
  this.start = this.options.start || this.getTime();

  this.addTime = function(offset){ 
    this.start -= offset;
  }

  this.current = function(){ 
    return secondsToTime((self.getTime() - self.start  ) / 1000)
  } 

}
