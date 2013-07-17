var output = document.getElementById('output');  
  
function assert( description, outcome ) {  
    var li = document.createElement('li');  
    li.className = outcome ? 'pass' : 'fail';  
    li.appendChild( document.createTextNode( description ) );  
      
    output.appendChild(li);  
};  
