var rootPath = "https://api.intuiface.com/webTriggers/v1/sendMessage";

$(document).ready(function () {
  //parse window location to retrieve apikey & device id

  var params = getJsonFromUrl();

  var apikey = params["apikey"];
  var xpname = params["xpname"];
  var deviceID = params["deviceid"];
  var tag = params["tag"];
  var emitter = params["emitter"];

  //parse all buttons to add onclick functions with proper url
  $(".webtrigger-button").each(function () {
    this.onclick = function () {
      var ID = "";
      //in case a specific device ID isn't defined, used experience name & player Tags (Entrance Flow Management sample)
      if (deviceID == undefined || deviceID == null)
        ID = "&experienceNames=" + xpname + "&playerTags=" + tag;
      //in case a specific (single) device is involved and define, use this device ID (customer facing QR Code samples)
      else ID = "&playerDeviceIDs=" + deviceID;

      var url = rootPath + "?apikey=" + apikey + ID +
        "&message=" + this.getAttribute("message") +
        "&parameter1=" + emitter;

      // MobileDrivenDataEntry sample: Display the chosen value on next screen
      var theChoice = document.getElementById("chosenvalue");
      theChoice.innerHTML = this.innerHTML;
           
      //call Intuiface Web Trigger API
      var res = httpGet(url);
      
      //hide buttons, show Thanks message with chosen answer
      var theAnswers = document.getElementById("listoptions");
      theAnswers.style.display = "none";
      var theThanks = document.getElementById("thanks");
      theThanks.style.display = "block";
    };
  });

  //Uncomment the section below if you wish to send an "init" message 
  //to the Intuiface Experience when a QR Code has been scanned. 
  
  ////send initialization message
  //var initUrl = rootPath+"?apikey="+apikey+ID+"&message=init;
  //httpGet(initUrl);
});

//parse web page URL parameters and return them as a JSON object
function getJsonFromUrl() {
  var query = location.search.substr(1);
  var result = {};
  query.split("&").forEach(function (part) {
    var item = part.split("=");
    result[item[0]] = decodeURIComponent(item[1]);
  });
  return result;
}

//method to send an HTTP GET Request (Intuiface Web Trigger API URL to use)
function httpGet(theUrl) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, true); // false for synchronous request
  xmlHttp.send(null);
  return xmlHttp.responseText;
}
