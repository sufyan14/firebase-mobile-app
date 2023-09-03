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
})
 
onValue(itemsInDB, function(snapshot) {
  let itemsArray = Object.values(snapshot.val())
  
  clearGroceryItem();
  for (let i = 0; i < itemsArray.length; i++) {

    appendItem(itemsArray[i])
  }
})


function appendItem(inputVal) {
    groceryList.innerHTML += `<li>${inputVal}</li>`;
}

function clearGroceryItem() {
  groceryList.innerHTML = ""
}

function clearItem() {
    item.value = "";
}
