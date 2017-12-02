//(function(){
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');

  //hérna stilli ég width og heigt, width og height fer eftir því í hvaða orientationi siðan er opnuð í.
  if (window.matchMedia("(orientation: portrait)").matches) {
    //widthin og heigtið á canvasinum
    canvas.height  = window.innerWidth;
    canvas.width = window.innerHeight;
  }
  else if (window.matchMedia("(orientation: landscape)").matches) {
    //widthin og heigtið á canvasinum
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }


  //náð í context úr canvasinum
  let maxWidth = Math.round(canvas.width);
  let maxHeigt = Math.round(canvas.height);
  //reiknað út stærðina á grísnum
  let size = Math.round(maxWidth * 0.07);
  // fundið upphafstaðsetninguna á grísnum
  let yPos = maxHeigt - size;
  let xPos = Math.round(maxWidth/2) - size/2;
  let pig = new Image();
  let coin = new Image();
  let x = 0;
  let points = 0;
  let coins = [];
  pig.onload = function()
      {
         ctx.drawImage(pig, xPos, yPos, size, (size * 0.8));
      }
  coin.src = "myndir/coin.png";
  pig.src = "myndir/gris.png";

  function drawOnCanvas(){
    ctx.drawImage(pig, xPos, yPos, size, (size * 0.8));
  }
  function clearCanvas(){
    ctx.clearRect(0, 0, maxWidth, maxHeigt);
  }
  function addPoints(){
    ctx.font = "30px Calibri";
    ctx.fillStyle = "yellow";
    if (points < 10) {
      ctx.fillText("0" + points + "x",size/5,size * 0.6);
    }
    else {
      ctx.fillText(points + "x",size/5,size * 0.6);
    }
    ctx.drawImage(coin, (size * 0.75), (size * 0.35), (size/3), (size/3));
  }

  function handleOrientation(e) {
  		// Device Orientation API
  	 x = e.beta;
  }
  let spawnCoins = setInterval(function(){
    let pos = Math.floor((Math.random() * maxWidth));
    let c = {xPos:pos, yPos:0}
    coins.push(c);
  }, 1000);
  let drawCoins = setInterval(function()
  {
    clearCanvas();
    drawOnCanvas();
    addPoints();
    for (i = 0; i < coins.length; i++) {
      if (coins[i].yPos >= (yPos - size/3) && coins[i].xPos <= (xPos + ((size * 0.8) / 2)) && coins[i].xPos >= (xPos - ((size * 0.8) / 2))) {

        points++;
        coins.splice(i, 1);
      }
      else if (coins[i].yPos < maxHeigt) {
        coins[i].yPos += size/15;
        ctx.drawImage(coin, coins[i].xPos, coins[i].yPos, size/2, size/2);
      }
      else if (coins[i].yPos > maxHeigt) {
        coins.splice(i,1);
      }
    }

  }, 10);


  let movePig = setInterval(function(){
    if (x > 0) {
      let speed = 250/x;
      if ((xPos+Math.round(size) < maxWidth)) {
        xPos+= Math.round(size/speed);
      }
    }
    else if (x < 0) {
      let speed = (250/x) * (-1);
      if (xPos > 0) {
        xPos-= Math.round(size/speed);
      }
    }
    drawOnCanvas();
  });

  addEventListener("keydown", function(e){
    e = e || window.event;
    if (e.keyCode == '37') {

         if (xPos > 0) {
           xPos-= Math.round(size/3);
         }
         drawOnCanvas();
    }
    else if (e.keyCode == '39') {
       // right arrow

       if ((xPos+Math.round(size) < maxWidth)) {
         xPos+= Math.round(size/3);
       }
       drawOnCanvas();
    }
  }, false);

  addEventListener("deviceorientation", handleOrientation, true);
  //Event listener sem að lætur í fullscreen þegar ýtt er á skjáinn
  addEventListener("click", function() {
   let el = document.documentElement;
   let rfs = el.requestFullscreen
       || el.webkitRequestFullScreen
       || el.mozRequestFullScreen
       || el.msRequestFullscreen;
   rfs.call(el);
  });




/*
========================================
                    GEYMA
========================================
  window.addEventListener("orientationchange", function() {
      //alert("the orientation of the device is now " + screen.orientation.angle);
      if (window.matchMedia("(orientation: portrait)").matches) {
         // you're in PORTRAIT mode
         console.log("portrait");
      }
      else if (window.matchMedia("(orientation: landscape)").matches) {

      }
  });



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

    */
