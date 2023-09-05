import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://cartify-4547d-default-rtdb.asia-southeast1.firebasedatabase.app",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const itemsInDB = ref(database, "items");

const item = document.getElementById("input-field");
const add_button = document.getElementById("add-button");
const groceryList = document.getElementById("grocery-list");

add_button.addEventListener("click", function () {
  let inputVal = item.value;

  push(itemsInDB, inputVal);

  clearItem();
});

onValue(itemsInDB, function(snapshot) {
  let itemsArray = Object.entries(snapshot.val());

  clearGroceryItem();

  for (let i = 0; i < itemsArray.length; i++) {
    let currentItem = itemsArray[i];
    let currentItemID = currentItem[0];
    let currentItemValue = currentItem[1];

    appendItem(currentItem);
  }
});

function appendItem(item) {
  let itemID = item[0];
  let itemValue = item[1];

  let newLi = document.createElement("li");
  newLi.textContent = itemValue
  groceryList.append(newLi);
}

function clearGroceryItem() {
  groceryList.innerHTML = "";
}

function clearItem() {
  item.value = "";
}
