import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
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
  let inputVal = item.value.trim(); 

  if (inputVal !== "") {
    push(itemsInDB, inputVal);
    clearItem();
  } else {
    alert("Please input an item first.");
  }
});

onValue(itemsInDB, function (snapshot) {
  if (snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val());

    clearGroceryItem();

    for (let i = 0; i < itemsArray.length; i++) {
      let currentItem = itemsArray[i];
      let currentItemID = currentItem[0];
      let currentItemValue = currentItem[1];

      appendItem(currentItem);
    }
  } else {
    groceryList.innerHTML = "Item list is empty";
  }
});

function appendItem(item) {
  let itemID = item[0];
  let itemValue = item[1];

  let newLi = document.createElement("li");
  newLi.textContent = itemValue;

  // Remove item from DB
  newLi.addEventListener("click", function () {
    let locOfItemInDB = ref(database, `items/${itemID}`);
    remove(locOfItemInDB);
  });

  groceryList.append(newLi);
}

function clearGroceryItem() {
  groceryList.innerHTML = "";
}

function clearItem() {
  item.value = "";
}
