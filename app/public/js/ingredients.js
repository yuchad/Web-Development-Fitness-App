function newIngredient(e) {
  if (e.keyCode === 13) {
      var node = document.createElement("input");
      node.setAttribute("onkeyup", "newIngredient(event)");
      node.className = "awesomplete";
      document.getElementById("ingredientsList").appendChild(node);
      new Awesomplete(node, {
        list: ingredients
      });
      node.focus();
      node.select();
    }
}

function getAllIngredients(){
  var finalIngredients = [];

  var items = document.getElementsByClassName("awesomplete");
  for (var i = 0; i < items.length; i++) {
    itemName = items[i].childNodes;
    itemName = itemName[2];
    if(itemName != null && itemName.innerHTML != ""){
      finalIngredients.push(itemName.innerHTML);
    }
  }

  console.log("This is the list we will send to get recipes");
  console.log(finalIngredients);
}
