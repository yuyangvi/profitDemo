function startCircleBorder() {
  var canvas = document.getElementById('circleCanvas');
  var ctx = canvas.getContext( '2d' );
  var x = canvas.width/2;
  var y = canvas.height/2;
  var radius = canvas.width/4;
  var radiusTwo = canvas.width/5;
  var angle = 0;
  var negAngle = 0;
  var curPerc = 0;
  /* the end precentage always needs to be one larger for full circle */
  var endPercent = 101;
  var circ = Math.PI * 2;
  var quart = Math.PI / 2;
  
  function doRotate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.strokeStyle = '#CCFFFF';
    ctx.lineWidth = 10;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 20;
    //ctx.shadowColor = '#00008B';

    // // loading环
    // ctx.beginPath();
    // ctx.arc(x,y,radius,-(quart),(circ)*(curPerc/101)-quart,false);
    // ctx.stroke();
    // ctx.closePath();
    
    // // 数字
    // if (curPerc < endPercent) {
    //   curPerc++;
    //   ctx.textAlign = 'center';
    //   ctx.fillStyle = '#CCFFFF';
    //   ctx.font = "30pt sans-serif";
    //   ctx.fillText((curPerc-1) + "%", x, y + 10);
    // }
    // else{
    //   ctx.textAlign = 'center';
    //   ctx.fillStyle = '#CCFFFF';
    //   ctx.font = "30pt sans-serif";
    //   ctx.fillText((endPercent-1) + "%", x, y + 10);
    // }
    
    var circleCount= 4;
    var counterClockwise = false;
    var startAngle = 1.26 * Math.PI + angle;
    var endAngle = 1.75 * Math.PI + angle;
  
    /* Animating the cirlces */
    for(var j = 0; j < circleCount; j++) {
      ctx.strokeStyle = '#CCFFFF';
    //   ctx.lineWidth = 5;
    //   ctx.beginPath();
    //   ctx.arc(x, y, radiusTwo, startAngle, endAngle, counterClockwise);
    //   ctx.stroke();
    //   ctx.closePath();
      startAngle += 0.5 * Math.PI;
      endAngle += 0.5 * Math.PI;    
      angle += 0.0005;
    }
    
    circleCount= 4;
    counterClockwise = false;
    startAngle = 1.26 * Math.PI + negAngle;
    endAngle = 1.75 * Math.PI + negAngle;
    var radiusThree = canvas.width/3;
    
    for(var i = 0; i < circleCount; i++) {
      ctx.strokeStyle = '#e0e0e0';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(x, y, radiusThree, startAngle, endAngle, counterClockwise);
      ctx.stroke();
      ctx.closePath();
      startAngle += 0.5 * Math.PI;
      endAngle += 0.5 * Math.PI;    
      negAngle -= 0.001;
    }
    
    var circleCountSmall= 222;
    counterClockwise = false;
    startAngle = 1 * Math.PI + angle;
    endAngle = 1.002 * Math.PI + angle;
    var radiusFour = canvas.width/2.7;
    
    for(var c = 0; c < circleCountSmall; c++) {
      ctx.strokeStyle = '#e0e0e0';
      ctx.lineWidth = 40;
      ctx.beginPath();
      ctx.arc(x, y, radiusFour, startAngle, endAngle, counterClockwise);
      ctx.stroke();
      ctx.closePath();
      startAngle += 0.009 * Math.PI;
      endAngle += 0.009 * Math.PI;    
    }
    /* Recalls the animation each time it loops through */
    window.requestAnimationFrame(doRotate);  
  }
  doRotate();
}