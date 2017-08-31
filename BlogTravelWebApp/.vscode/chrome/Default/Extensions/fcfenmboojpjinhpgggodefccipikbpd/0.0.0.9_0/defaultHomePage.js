window.onload = function(){
    parent.postMessage({ action: "init"}, "*");
    var mvsPostionRef = document.getElementById("mvs_position_ref").getBoundingClientRect();
    parent.postMessage({action: "position", pixelsLeft: mvsPostionRef.left+3, pixelsTop: mvsPostionRef.top+116 }, "*");
};

window.onresize = function() {
    var mvsPostionRef = document.getElementById("mvs_position_ref").getBoundingClientRect();
    parent.postMessage({action: "position", pixelsLeft: mvsPostionRef.left+4, pixelsTop: mvsPostionRef.top+116 }, "*");
};