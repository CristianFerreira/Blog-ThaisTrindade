var connectionUrl = "https://www.bing.com/favicon.ico?_=" + new Date().getTime();
var bingUrl = "https://www.bing.com/chrome/newtab?origin=ext&pc=U480";
var defaultUrl = "defaultHomePage.html";
var uninstallUrl = "https://www.bing.com/chrome/uninstall?origin=ext&pc=U480";
var bingDomain = "https://www.bing.com";
var extensionDomain = "chrome-extension://"+chrome.runtime.id;

chrome.runtime.setUninstallURL(uninstallUrl);

window.onload = function(){
    loadNewTab();
    chrome.topSites.get(initMvs);
};

function setNewTabPage(online) {
    var newTabFrame = document.getElementById("ntp-frame");
    if(online && newTabFrame)
    {
        newTabFrame.src = bingUrl;
    }
    else
    {
        newTabFrame.src = defaultUrl;
    }
}

function loadNewTab(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", connectionUrl);
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.onreadystatechange = function(){
        if(xhr.readyState === XMLHttpRequest.DONE){
            if(xhr.status >= 200 && (xhr.status < 300 || xhr.status === 304))
            {
                setNewTabPage(true);
            }
            else{
                setNewTabPage(false);
            }
        }
    };
    xhr.send();
}