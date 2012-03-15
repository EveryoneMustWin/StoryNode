var http = require("http");
var url = require("url");
var querystring = require("querystring");

function start(route, handle, hash) {
	
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    var query = url.parse(request.url).query;
    var qs = querystring.parse(query);
    var id = qs["uid"];
    var slot = qs["slot"];

    request.setEncoding("utf8");

    var postData = "";

    request.addListener("data", function(postDataChunk) 
    {
      postData += postDataChunk;
      console.log("Received POST data chunk '" + postDataChunk + "'.");
    });

    request.addListener("end", function() 
    {
      var ps = querystring.parse(postData);

      console.log("end listener called postData " + postData + " ps " + ps);
      route(handle, pathname, response, id, slot, hash, ps);
    });

  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;
