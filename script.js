//let canvas = document.getElemntById('canvas');
//canvas.requestFullScreen();

if (window.matchMedia("(orientation: portrait)").matches) {
   // you're in PORTRAIT mode
   alert("portrait");
}
if (window.matchMedia("(orientation: landscape)").matches) {
   // you're in LANDSCAPE mode
   alert("landscape");
}
