(function(){
  window.addEventListener("orientationchange", function() {
      //alert("the orientation of the device is now " + screen.orientation.angle);
      if (window.matchMedia("(orientation: portrait)").matches) {
         // you're in PORTRAIT mode
         console.log("portrait");
      }
      else if (window.matchMedia("(orientation: landscape)").matches) {
         // you're in LANDSCAPE mode
         let canvas = document.getElementById("canvas");
         //widthin og heigtið á canvasinum
         canvas.width  = window.innerWidth;
         canvas.height = window.innerHeight;
         //náð í context úr canvasinum
         let ctx = canvas.getContext('2d');
         let maxWidth = Math.round(canvas.width);
         let maxHeigt = Math.round(canvas.height);
         //reiknað út stærðina á grísnum
         let size = Math.round(maxWidth * 0.07);
         // fundið upphafstaðsetninguna á grísnum
         let yPos = maxHeigt - size;
         let xPos = Math.round(maxWidth/2) - size/2;
         //þetta er stærðin á grísnum
         let pig = new Image();
         pig.src = "myndir/gris.png";
         //teiknað grísinn
         ctx.drawImage(pig, xPos, yPos, size, (size * 0.8));


         function clearCanvas(){
           ctx.clearRect(0, 0, canvas.width, canvas.height);
         }


      }
  });
  //Event listener sem að lætur í fullscreen þegar ýtt er á skjáinn
  addEventListener("click", function() {
   let el = document.documentElement;
   let rfs = el.requestFullscreen
       || el.webkitRequestFullScreen
       || el.mozRequestFullScreen
       || el.msRequestFullscreen;
   rfs.call(el);

  });




})();
