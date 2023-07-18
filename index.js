/** @format */
"use strict";

class BSTNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
function insert(rootNode, value) {
  if (rootNode === null) return new BSTNode(value);
  if (rootNode.value >= value) rootNode.left = insert(rootNode.left, value);
  else rootNode.right = insert(rootNode.right, value);
  return rootNode;
}

function depthTree(rootNode) {
  if (rootNode === null) return 0;
  return Math.max(depthTree(rootNode.left), depthTree(rootNode.right)) + 1;
}

function parse(text) {
  return text.split(",").map((value) => Number(value.trim()));
}
function printInOrder(root) {
  if (root === null) {
    return;
  }
  printInOrder(root.left);
  console.log(root.value);
  printInOrder(root.right);
}

function generateBST(array) {
  let root = null;
  array.forEach((element) => {
    root = insert(root, element);
  });
  return root;
}

function giveValuesLevel(root, depth) {
  let queue = [];
  queue.push(root);
  for (let level = 0; level < depth; level++) {
    let power = 1 << level;
    for (let index = 0; index < power; index++) {
      let node = queue.shift();
      if (node === null) {
        continue;
      }
      let domNode = document.getElementById(`level-${level}-${index}`);
      domNode.style.display = "flex";
      domNode.style.justifyContent = "center";
      domNode.style.alignItems = "center";
      domNode.innerText = node.value;
      domNode.style.backgroundColor = "pink";
      queue.push(node.left);
      queue.push(node.right);
    }
  }
}

function CreateDivTags(depth) {
  let rootDiv = document.getElementById("root");
  let nodeNumber = 0;
  for (let i = 0; i < depth; i++) {
    let div = document.createElement("div");
    div.id = `container-${i}`;
    div.style.display = "flex";
    div.style.justifyContent = "space-evenly";
    div.style.alignItems = "center";
    div.style.backgroundColor = "orange";
    div.style.margin = "2%";
    div.style.height = "50px";
    let power = 1 << i;
    for (let j = 0; j < power; j++) {
      let numberDiv = document.createElement("div");
      numberDiv.id = `node-${nodeNumber++}`;
      numberDiv.style.height = "30px";
      numberDiv.style.width = "30px";
      numberDiv.style.margin = "3%";
      numberDiv.style.borderRadius = "50%";
      div.appendChild(numberDiv);
    }
    rootDiv.appendChild(div);
  }
}

function giveValueDepth(root, nodeNumber) {
  if (root === null) {
    return;
  }
  let domNode = document.getElementById(`node-${nodeNumber}`);
  domNode.style.display = "flex";
  domNode.style.justifyContent = "center";
  domNode.style.alignItems = "center";
  domNode.innerText = root.value;
  domNode.style.backgroundColor = "pink";
  if (root.left) {
    new LeaderLine(
      domNode,
      document.getElementById(`node-${(nodeNumber << 1) + 1}`),
      {
        path: "straight",
        size: 2,
        color: "#87CEFA",
      }
    );
  }
  if (root.right) {
    new LeaderLine(
      domNode,
      document.getElementById(`node-${(nodeNumber << 1) + 2}`),
      {
        path: "straight",
        size: 2,
        color: "#87CEFA",
      }
    );
  }
  giveValueDepth(root.left, (nodeNumber << 1) + 1);
  giveValueDepth(root.right, (nodeNumber << 1) + 2);
}

function draw_tree() {
  let input_text = document.getElementById("number_input");
  let array = parse(input_text.value);
  let root = generateBST(array);
  printInOrder(root);
  let depthOfTree = depthTree(root);
  CreateDivTags(depthOfTree);
  giveValueDepth(root, 0);
}
