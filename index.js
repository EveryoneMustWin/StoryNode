var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");
var story = require("./StoryNode");

var node = story.startStory("aaa");

console.log("[root] " + node.text);

for (var t in node)
{
  if (typeof node[t] === 'object') console.log("[property " + t +"] " + node[t].text);
}

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/data"] = requestHandlers.data;

server.start(router.route, handle);
