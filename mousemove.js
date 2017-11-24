function startmousemove(){
window.addEventListener('mousemove', (pos)=>{
      const canvas1 = document.getElementById("circleCanvas");
      const canvas2 = document.getElementById("circleBlue");
      const canvas3 = document.getElementsByClassName("electric-loader")[0];
      const canvas4 = document.getElementById('canvasParticle');
      const node = canvas1;
      const originWidth = node.parentNode.scrollWidth;
      const originHeight = node.parentNode.scrollHeight;
      const elementCenterX = node.offsetLeft + node.offsetWidth / 2;
      const elementCenterY = node.offsetTop + node.offsetHeight / 2;
      const originX = pos.pageX;
      const originY = pos.pageY;

      const focalPointX = (elementCenterX - originX) * (elementCenterX / originWidth / elementCenterX);
      const focalPointY = (elementCenterY - originY) * (elementCenterY / originHeight / elementCenterY);

      const rotateX = focalPointY * 40;
      const rotateY = focalPointX * 40;

      canvas1.style.transform = 'rotateY(' + -rotateY + 'deg) rotateX(' + rotateX + 'deg)';
      canvas2.style.transform = 'rotateY(' + -rotateY + 'deg) rotateX(' + rotateX + 'deg)';
      canvas3.style.transform = 'rotateY(' + -rotateY + 'deg) rotateX(' + rotateX + 'deg)';

      canvas4.style.transform = 'translate(' + rotateY*3 + 'px, ' + rotateX*3 + 'px)';
    }, false);
  }