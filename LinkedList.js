class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  // Add value to the start of the list
  prepend(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
  }

  // Add value to the end of the list
  append(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
  }

  // Insert value at a specific index in the list
  insert(value, index) {
    if (index < 0 || index > this.length) {
      return false;
    }
    if (index === 0) {
      this.prepend(value);
      return true;
    }
    if (index === this.length) {
      this.append(value);
      return true;
    }
    const newNode = new Node(value);
    let current = this.head;
    let currentIndex = 0;
    while (currentIndex !== index - 1) {
      current = current.next;
      currentIndex++;
    }
    newNode.next = current.next;
    current.next = newNode;
    this.length++;
    return true;
  }

  // Remove the value at a specific index from the list
  remove(index) {
    if (index < 0 || index >= this.length) {
      return undefined;
    }
    if (index === 0) {
      const removed = this.head;
      this.head = this.head.next;
      this.length--;
      return removed.value;
    }
    let current = this.head;
    let currentIndex = 0;
    while (currentIndex !== index - 1) {
      current = current.next;
      currentIndex++;
    }
    const removed = current.next;
    current.next = current.next.next;
    this.length--;
    return removed.value;
  }

  // Return a string representation of the list
  toString() {
    let current = this.head;
    let result = "";
    while (current) {
      result += current.value + " -> ";
      current = current.next;
    }
    return result.slice(0, -4);
  }
}

const listbox = document.getElementById("listbox");
const textbox = document.getElementById("textbox");
const linkedlistoutput = document.getElementById("linkedlistoutput");
const prependButton = document.getElementById("prepend");
const appendButton = document.getElementById("append");
const insertButton = document.getElementById("insert");
const deleteButton = document.getElementById("delete");

const linkedList = new LinkedList();

// Add initial values from list box to linked list
for (let i = 0; i < listbox.options.length; i++) {
  linkedList.append(listbox.options[i].value);
}
linkedlistoutput.value = linkedList.toString();

// Function to update the list box with the current values from the linked list
function updateListbox() {
  // Clear the options in the list box
  listbox.options.length = 0;

  // Add the values from the linked list to the list box
  let current = linkedList.head;
  while (current) {
    listbox.options[listbox.options.length] = new Option(current.value);
    current = current.next;
  }
}
updateListbox();

listbox.addEventListener("change", function() {
  textbox.value = listbox.value;
});

prependButton.addEventListener("click", function() {
  linkedList.prepend(textbox.value);
  linkedlistoutput.value = linkedList.toString();
  updateListbox();
});

appendButton.addEventListener("click", function() {
  linkedList.append(textbox.value);
  linkedlistoutput.value = linkedList.toString();
  updateListbox();
});

insertButton.addEventListener("click", function() {
  const selectedIndex = listbox.selectedIndex;
  if (selectedIndex === -1) {
    alert("you have to select a position in the list box");
  } else {
    linkedList.insert(textbox.value, selectedIndex);
    linkedlistoutput.value = linkedList.toString();
    updateListbox();
  }
});

deleteButton.addEventListener("click", function() {
  const selectedIndex = listbox.selectedIndex;
  if (selectedIndex === -1) {
    alert("you have to select a position in the list box");
  } else {
    linkedList.remove(selectedIndex);
    linkedlistoutput.value = linkedList.toString();
    updateListbox();
  }
});

