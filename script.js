if (window.matchMedia("(orientation: portrait)").matches) {
   // you're in PORTRAIT mode
   console.log("portrait");
}
if (window.matchMedia("(orientation: landscape)").matches) {
   // you're in LANDSCAPE mode

   //Event listener sem að lætur í fullscreen þegar ýtt er á skjáinn
   addEventListener("click", function() {
    let el = document.documentElement;
    let rfs = el.requestFullscreen
        || el.webkitRequestFullScreen
        || el.mozRequestFullScreen
        || el.msRequestFullscreen;
    //reloada til að laga bakgruns myndina
    location.reload();
    rfs.call(el);

  });
}
