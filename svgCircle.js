function startSvgCircle() { 
  function guid() {
     return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
       var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
       return v.toString(16);
    });
  }
  
  d3.select('.electric-loader').attr("width", W).attr("height", H)

  var svgns = "http://www.w3.org/2000/svg";
  var twoPI = Math.PI * 2;
  
  function ElectricLine(radius, startOffset = 0, transparent){
  
    var tempSVG = document.createElementNS(svgns, 'svg');
    var path = document.createElementNS(svgns, 'path');
    path.id = "s" + guid();
  
    var coords = [];
    var centerX = W/2-8;
    var centerY = H/2-10;
  
    for (var i = 0; i <= twoPI + 0.03; i += 0.03 ){
      coords.push( 
        centerX + ( Math.sin( i + startOffset ) * radius ), 
        centerY + ( Math.cos( i + startOffset ) * radius )
      );
    }
  
    if (transparent){
      path.style.opacity = transparent;
    }
    // Slightly randomize the points
    function updateElectricLine(){
      d3.select("#"+ path.id).transition().attr('d', coords.map((point,i)=>{ 
          return ( 
            i == 0 ? 'M' : 
            i % 2 == 0 ? 'L' : 
            ',' 
          )
           + Math.round( ( point + Math.random() * 17 ) * 100 ) / 100 
      }).join(''));
    }
  
    updateElectricLine();
  
    // Have to get it in the dom for `getTotalLength` to work
    tempSVG.appendChild(path);
    document.body.appendChild(tempSVG);
  
    // Get the line length
    var length = path.getTotalLength();
    document.body.removeChild(tempSVG);
  
    // Set an accurate strokeDasharray & offset for the animation
    path.style.strokeDasharray = length/2; //( length * 0.48 ) + ' ' + ( length * 0.52 );
    path.style.strokeDashoffset = -length;
  
    return {
      el: path,
      update: updateElectricLine
    }
  }
  
  
  var lines = [
    new ElectricLine( H/3 - 55 , Math.PI * 0 ),
    new ElectricLine( H/3 - 54.5 , Math.PI * 0 , 0.5),
    new ElectricLine( H/3 - 54 , Math.PI * 0 , 0.3)
  ];
  
  var svgCircle = document.querySelector('.electric-loader g');
  lines.forEach( line => { svgCircle.appendChild(line.el); });
  
  var t = 0;
  function update(){
    requestAnimationFrame(update);
    if ( t % 5 == 0 ) { 
      lines.forEach( line => { line.update(); })
    }
    t++;
  }
  
  update();
  }
  