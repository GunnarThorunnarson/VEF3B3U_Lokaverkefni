(function(){
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
  // fundið upphafstaðsetninguna á grísnum, sem er í miðjunni á x ás og neðst niðri á y ás
  let yPos = maxHeigt - size;
  let xPos = Math.round(maxWidth/2) - size/2;
  //þetta er breytan fyrir orientationið á símanum
  let x = 0;
  //teljari fyrir stiginn hjá spilaranum
  let points = 0;
  //array undir öll coinin
  let coins = [];
  //búið til pig og coin myndirnar
  let pig = new Image();
  let coin = new Image();
  //Þetta er onload þannig að grísinn teiknist á canvasinn í byrjun
  pig.onload = function()
      {
         ctx.drawImage(pig, xPos, yPos, size, (size * 0.8));
      }
  //hérna eru sourcin á coin myndina og grísa myndina
  coin.src = "myndir/coin.png";
  pig.src = "myndir/gris.png";

  //Þetta er function til að teikna grísinn á canvasinn
  function drawOnCanvas(){
    ctx.drawImage(pig, xPos, yPos, size, (size * 0.8));
  }
  //Þetta function er til að hreinsa canvasinn
  function clearCanvas(){
    ctx.clearRect(0, 0, maxWidth, maxHeigt);
  }
  //Þetta function teiknar út stigatöfluna uppi í hægra horninu
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
  //Þetta function vibrate-ar símannn ef það er hægt
  function vibrate(){
    //ef síminn getur vibrate-ap þá gerir hann það, annars ekki
    navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
  }
  //Þetta er funtion til að stilla x sem Orientation-ið á símanum
  function handleOrientation(e) {
  		// Device Orientation API
  	 x = e.beta;
  }
  //Þetta function teiknar öll coinin og sér líka um það ef að grísinn
  //pikkar upp coinin fær hann stig
  function drawCoins(){
    for (i = 0; i < coins.length; i++) {
      if (coins[i].yPos >= (yPos - size/3) && coins[i].xPos <= (xPos + ((size * 0.8) / 2)) && coins[i].xPos >= (xPos - ((size * 0.8) / 2))) {
        points++;
        //fjarlægja coinið úr arrayinu
        coins.splice(i, 1);
        //kalla í vibrate functionið vegna þess að notandinn fékk stig
        vibrate();
      }
      else if (coins[i].yPos < maxHeigt) {
        //hreyfa coinið niður
        coins[i].yPos += size/15;
        //teikna coinið
        ctx.drawImage(coin, coins[i].xPos, coins[i].yPos, size/2, size/2);
      }
      else if (coins[i].yPos > maxHeigt) {
        //fjarlægja coinið úr arrayinu vegna þess að það er farið af skjánum
        coins.splice(i,1);
      }
    }
  }

  //Þetta er interval-ið sem að keyrist á 1 sekúndu fresti og bætir við nýrri coin í coin arrayið
  //Með random xPos staðsetningu
  let spawnCoins = setInterval(function(){
    let pos = Math.floor((Math.random() * maxWidth));
    let c = {xPos:pos, yPos:0}
    coins.push(c);
  }, 1000);

  //Þetta function er aðal leikja functionið
  //Það kallar í að hreinsa canvasin
  //og líka í að teikna grísinn og öll coinin
  let game = setInterval(function()
  {
    clearCanvas();
    drawOnCanvas();
    addPoints();
    drawCoins();
  }, 10);

  //hérna er functionið sem hreyfir grísinn í símum
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
  });
  //hérna eru eventlistenarirnir sem hreyfa grísinn í tölvu,
  //þetta var mjög þæginlegt þegar ég var að prófa hluti
  //þannig ég þurfti ekki alltaf að færa það á serverinn og opna það svo í símanum
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
  //event listener sem updatear xið á orientationinu á símanum
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
})();
