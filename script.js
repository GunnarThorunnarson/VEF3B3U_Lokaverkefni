//(function(){
  window.addEventListener("orientationchange", function() {
      //alert("the orientation of the device is now " + screen.orientation.angle);
      if (window.matchMedia("(orientation: portrait)").matches) {
         // you're in PORTRAIT mode
         console.log("portrait");
      }
      else if (window.matchMedia("(orientation: landscape)").matches) {

      }
  });






  function handleOrientation(e) {
  		// Device Orientation API
  		let x = e.gamma; // range [-90,90], left-right
  		move(x);
  }
  function move(x){
    gris.body.velocity.x += x;
  }
  setUpGame();
  function setUpGame(){
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
    pig.onload = function()
        {
           ctx.drawImage(pig, xPos, yPos, size, (size * 0.8));
        }
    pig.src = "myndir/gris.png";

  }


  function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }


  function check(){
    if (!window.screenTop && !window.screenY) {
      console.log('fullscreen');
    } else {
      console.log('not fullscreen');
    }
  }
  addEventListener('webkitfullscreenchange', function(e) {
    check();
  }, false);
  addEventListener('mozfullscreenchange', function(e) {
    check();
  }, false);
  addEventListener('fullscreenchange', function(e) {
    check();
  }, false);
  //Event listener sem að lætur í fullscreen þegar ýtt er á skjáinn
  addEventListener("click", function() {
   let el = document.documentElement;
   let rfs = el.requestFullscreen
       || el.webkitRequestFullScreen
       || el.mozRequestFullScreen
       || el.msRequestFullscreen;
   rfs.call(el);
  });
  addEventListener("deviceorientation", handleOrientation, true);
