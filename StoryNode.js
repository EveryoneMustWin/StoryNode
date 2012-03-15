
function StoryNode(t, i) {
	
  if (this instanceof StoryNode)
  {
    this.text = t;
    this.uid = i;
  }
  else
  {
  	console.log("ERROR: StoryNode called without new");
  	return new StoryNode(t, i);
  }
}

function startStory() {
  var rootNode = new StoryNode("Once upon a time", 1);

  rootNode[1] = new StoryNode("A beautiful princess", 2);
  rootNode[2] = new StoryNode("A brave prince", 3);
  rootNode[3] = new StoryNode("A timid squire", 4);
  rootNode[4] = new StoryNode("A grumpy bus driver", 5);

  rootNode[1][1] = new StoryNode("who lived in a lofty tower in a magnificent castle", 6);
  rootNode[1][2] = new StoryNode("who lived in a yurt", 7);

  return rootNode;
}

exports.StoryNode = StoryNode;
exports.startStory = startStory;

