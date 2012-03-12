function viewnode(response, node, id, hash) {
    console.log("Request handler 'viewnode' was called." + node + " id was " + id + "<br>");

    response.writeHead(200, {"Content-Type": "text/html"});
    
    if (id === undefined)
    {
      console.log("Probably you want root node")
      id = 1;
    }

    var hashnode = hash[id];

    if (typeof hashnode === 'object')
    {
      response.write("<html><head></head><body>");
      response.write("<b>" + hashnode.text + "</b><br>");
      if (typeof hashnode[1] === 'object') response.write("<a href=viewnode?uid=" + hashnode[1].uid + ">" + hashnode[1].text + "</a><br>");
      if (typeof hashnode[2] === 'object') response.write("<a href=viewnode?uid=" + hashnode[2].uid + ">" + hashnode[2].text + "</a><br>");
      if (typeof hashnode[3] === 'object') response.write("<a href=viewnode?uid=" + hashnode[3].uid + ">" + hashnode[3].text + "</a><br>");
      if (typeof hashnode[4] === 'object') response.write("<a href=viewnode?uid=" + hashnode[4].uid + ">" + hashnode[4].text + "</a><br>");
      response.write("</body>");
    }
    else
    {
      response.write("Couldn't find this node!");
    }

    response.end();
}

function newnode(response, node, id, hash) {
  console.log("Request handler 'newnode' was called.");
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello Upload");
  response.end();
}

function data(response, node, id, hash) {
  console.log("Request handler 'data' was called.");
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Data");
  response.end();

}

exports.viewnode = viewnode;
exports.newnode = newnode;
