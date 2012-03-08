
function StoryNode(t) {
  this.text = t;
}

function startStory() {
  var rootNode = new StoryNode("Once upon a time");

  rootNode[1] = new StoryNode("A beautiful princess");
  rootNode[2] = new StoryNode("A brave prince");
  rootNode[3] = new StoryNode("A timid squire");
  rootNode[4] = new StoryNode("A grumpy bus driver");

  return rootNode;
}

// exports.StoryNode = StoryNode;
exports.startStory = startStory;

