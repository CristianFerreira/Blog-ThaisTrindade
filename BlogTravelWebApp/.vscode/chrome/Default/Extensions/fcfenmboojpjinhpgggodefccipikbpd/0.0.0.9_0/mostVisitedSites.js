var maxMvs = 8;
var px = "px";
var tileMargin = 10;
var mvsContainerId = "ntp-contents";

function receiveMessage(event) {
    if (event.origin === extensionDomain || event.origin.startsWith(bingDomain)) {
        switch (event.data.action) {
            case "position":
                positionHandler(event.data.pixelsLeft, event.data.pixelsTop);
                break;
            case "switch":
                showMvsHandler(event.data.showMvs);
                break;
            case "init":
                initHandler();
                break;
            default:
                break;
        }
    }
    else {
    }
}

window.addEventListener("message", receiveMessage, false);

function initHandler(){
    var mvsContainer = document.getElementById(mvsContainerId);
    mvsContainer.classList.add("mvs_on");
}

function positionHandler(pixelsLeft, pixelsTop){
    var mvsContainer = document.getElementById(mvsContainerId);
    mvsContainer.style.left = (event.data.pixelsLeft-tileMargin) + px;
    mvsContainer.style.top = event.data.pixelsTop + px;
}

function showMvsHandler(showMvs){
    var mvsContainer = document.getElementById(mvsContainerId);
    if(showMvs){
        mvsContainer.classList.remove("mvs_hide");
    }
    else{
        mvsContainer.classList.add("mvs_hide");
    }
}

function initMvs(data){
    var tilesContainer = document.getElementById("mv-tiles");
    for (var i = 0; i < data.length && i < maxMvs; i++) {
        var currentSite = new MostVisitedSite(data[i].url, data[i].title);
        var currentTile = CreateTile(currentSite);
        tilesContainer.appendChild(currentTile);
    }
}

function MostVisitedSite(url, title) {
    this.url = url;
    this.favicon = "chrome://favicon/" + url;
    this.title = title;
}

function CreateTile(mostVisitedSite) {
    // Favicon
    faviconContainer = createDiv("mv-favicon");
    faviconImg = createImage(mostVisitedSite.favicon);
    faviconImg.className = "mv-fav";
    faviconContainer.appendChild(faviconImg);

    // Title
    titleContainer = createDiv("mv-title");
    titleContainer.innerHTML = mostVisitedSite.title;
    
    tileDiv = createDiv("mv-tile-content"); 
    tileDiv.appendChild(faviconContainer);
    tileDiv.appendChild(titleContainer);
    
    linkContainer = document.createElement("a");
    linkContainer.className = "mv-tile";    
    linkContainer.href = mostVisitedSite.url;
    linkContainer.title = mostVisitedSite.title;

    linkContainer.appendChild(tileDiv);
    return linkContainer;
}

function createDiv(className) {
    var div = document.createElement("div");
    div.className = className;
    return div;
}

function createImage(src) {
    var img = document.createElement("img");
    img.src = src;
    return img;
}