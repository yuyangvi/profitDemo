const twoPI = Math.PI * 4;

const coords = [];
const centerX = 50;
const centerY = 50;
const startOffset = Math.PI * 1;
const radiusPI = 70;

const t = 0;

const svgCircle = d3.select("body").append("svg")
.attr("width", 500)
.attr("height", 500)

for (let i = 0; i <= twoPI + 0.02; i += 0.02 ){
  coords.push( 
    centerX + ( Math.sin( i + startOffset ) * radiusPI ), 
    centerY + ( Math.cos( i + startOffset ) * radiusPI )
  );
}


svgCircle.attr('class', 'electric-loader').append("path").attr("d", coords.map((point,i)=>{ 
    return ( 
      i == 0 ? 'M' : 
      i % 2 == 0 ? 'L' : 
      ',' 
    )
     + Math.round( ( point + Math.random() * 2 ) * 100 ) / 100 
  }).join(''));

  function update(){
    requestAnimationFrame(update);
    if ( t % 10 == 0 ) { 
      lines.forEach( line => { line.update(); })
    }
    t++;
  }
  
  update();
  