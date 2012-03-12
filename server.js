var http = require("http");
var url = require("url");
var querystring = require("querystring");

function start(route, handle, node, hash) {
	
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    var query = url.parse(request.url).query;
    console.log("url " + url + " query " + query + "<br>");
    var qs = querystring.parse(query);
    console.log("qs " + qs + "<br>");
    var id = qs["uid"];
    console.log("Request for " + pathname + " received with id " + id + ".");

    route(handle, pathname, response, node, id, hash);
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;
