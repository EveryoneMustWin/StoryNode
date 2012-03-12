function route(handle, pathname, response, node, id, hash) {

  console.log("About to route a request for " + pathname + "<br>");
  
  if (typeof handle[pathname] === 'function') 
  {
    handle[pathname](response, node, id, hash);
  } 
  else 
  {
    console.log("No request handler found for " + pathname);
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.write("404 Not found");
    response.end();
  }
}

exports.route = route;
