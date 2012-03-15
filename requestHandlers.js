var story = require("./StoryNode");

// The slot and postData parameters will not be used in viewnode
function viewnode(response, id, slot, hash, postData) {
    console.log("Request handler 'viewnode' was called. id was " + id + "<br>");

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
      response.write("<b>" + hashnode.text + "...</b><br><br>");
	  response.write(nodehtml(hashnode,1,id));
	  response.write(nodehtml(hashnode,2,id));
	  response.write(nodehtml(hashnode,3,id));
	  response.write(nodehtml(hashnode,4,id));
      response.write("</body>");
    }
    else
    {
      response.write("Couldn't find this node!");
    }

    response.end();
}

function nodehtml(currentnode, slotnum, parentid)
{
  var childnode = currentnode[slotnum];
  
  if (typeof childnode === 'object') 
  {
  	// If this node already exists it has text and a uid
  	return("<a href=viewnode?uid=" + childnode.uid + ">" + childnode.text + "</a><br>");
  }
  else
  {
  	// If this node doesn't exist, it won't have an id yet but the id of the parent
  	// node will be needed to ensure that it has a link to the new node
   	return(
    '<form action="/newnode?uid=' + currentnode.uid + '&slot=' + slotnum + '" method="post">'+
    '<textarea name="text" rows="1" cols="60"></textarea>'+
    '<textarea name="password" rows="1" cols="16">password</textarea>'+
    '<input type="submit" value="Submit text" />'+
    '</form>');
  } 
}

function newnode(response, id, slot, hash, posthash) 
{
  // TODO validate postData
  
  console.log("id = " + id + " slot = " + slot + " hash = " + hash + " posthash = " + posthash)

  var new_uid = hash['last'];
  hash['last'] = hash['last'] + 1;
  var text = posthash['text'];
  var pass = posthash['password'];
  
  if (pass != "custard")
  {
  	response.writeHead(200, {"Content-Type": "text/html"});

    response.write("<html><head></head><body>");
    response.write("<b>Incorrect password</b><br><br>");
    response.write("</body>");

    response.end();
    
    return;
  }

  new_node = new story.StoryNode(text, new_uid);

  var parentnode = hash[id];

  if (typeof parentnode === 'object')
  {
    console.log("parentnode[slot] = new_node");
    parentnode[slot] = new_node;
    console.log("hash[id] = " + hash[id]);
    hash[new_uid] = new_node;
  }

  response.writeHead(200, {"Content-Type": "text/html"});

  response.write("<html><head></head><body>");
  response.write("<b>" + parentnode.text + "...</b><br><br>");
  response.write(nodehtml(parentnode,1,id));
  response.write(nodehtml(parentnode,2,id));
  response.write(nodehtml(parentnode,3,id));
  response.write(nodehtml(parentnode,4,id));
  response.write("</body>");

  response.end();
}

exports.viewnode = viewnode;
exports.newnode = newnode;
