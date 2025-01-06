const { NotImplementedError } = require('../extensions/index.js');
const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  node = null;

  root() {
    return this.node;
  }

  add(data) {
    const newNode = new Node(data);
    const  addNode = (current) => {
      if (data < current.data) {
        if (!current.left) {
          current.left = newNode;
        } else {
          addNode(current.left);
        }
      } else if (data > current.data) {
        if (!current.right) {
          current.right = newNode;
        } else {
          addNode(current.right);
        }
      }
    };
    
    if (!this.node) {
      this.node = newNode;
    } else {
      addNode(this.node);
    }
  }

  has(data) {
    let currentNode = this.node;

    while (currentNode) {
      if (currentNode.data === data) {
        return true;
      } else if (currentNode.data > data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    return false;
  }

  find(data) {
    let currentNode = this.node;

    while (currentNode) {
      if (currentNode.data === data) {
        return currentNode;
      } else if (currentNode.data < data) {
        currentNode = currentNode.right;
      } else {
        currentNode = currentNode.left;
      }
    }
    return null;
  }

  remove(data) {
    const minNode = (node) => {
      while (node.left) {
        node = node.left;
      }
      return node;
    };

    const removeNode = (node, data) => {
      if (!node) return null;

      if (data < node.data) {
        node.left = removeNode(node.left, data);
      } else if (data > node.data) {
        node.right = removeNode(node.right, data);
      } else {
        if (!node.left) return node.right;
        if (!node.right) return node.left;

        node.data = minNode(node.right).data;
        node.right = removeNode(node.right, minNode(node.right).data);
      }
      return node;
    };
    this.node = removeNode(this.node, data);
  }

  min() {
    let currentNode = this.node;

    while (currentNode.left) {
      currentNode = currentNode.left;
    }
    return currentNode.data;
  }

  max() {
    let currentNode = this.node;

    while (currentNode.right) {
      currentNode = currentNode.right;
    }
    return currentNode.data;
  }
}

module.exports = {
  BinarySearchTree
};