//let canvas = document.getElemntById('canvas');
//canvas.requestFullScreen();
if (window.matchMedia("(orientation: portrait)").matches) {
   // you're in PORTRAIT mode
   console.log("portrait");
}
if (window.matchMedia("(orientation: landscape)").matches) {
   // you're in LANDSCAPE mode
   addEventListener("click", function() {
    var el = document.documentElement,
      rfs = el.requestFullscreen
        || el.webkitRequestFullScreen
        || el.mozRequestFullScreen
        || el.msRequestFullscreen
    ;
    rfs.call(el);
});
}
