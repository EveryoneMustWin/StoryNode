var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");
var story = require("./StoryNode");

var node = story.startStory();

for (var t in node)
{
  if (typeof node[t] === 'object') console.log("[property " + t +"] " + node[t].text);
}

var handle = {}
handle["/"] = requestHandlers.viewnode;
handle["/viewnode"] = requestHandlers.viewnode;
handle["/newnode"] = requestHandlers.newnode;
handle["/data"] = requestHandlers.data;


var hash = {1 : node};
hash[2]=node[1];
hash[3]=node[2];
hash[4]=node[3];
hash[5]=node[4];
hash[6]=node[1][1];
hash[7]=node[1][2];
hash['last']=8;

server.start(router.route, handle, hash);
