function doIt(ingredients) {
    var recipeID, recipeTitle;
    var output = $.ajax({
        url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=' + ingredients + '&limitLicense=false&number=12&ranking=1', // The URL to the API. You can get this by clicking on "Show CURL example" from an API profile
        type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
        data: {}, // Additional parameters here
        dataType: 'json',
        success: function(data) {
            for(var i = 0; i < data.length; i++){
                recipeID = data[i].id;
                var recipe = $.ajax({
                    url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/'+ recipeID +'/information?includeNutrition=true', // The URL to the API. You can get this by clicking on "Show CURL example" from an API profile
                    type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
                    data: {}, // Additional parameters here
                    dataType: 'json',
                    success: function(data) {
                        var card = document.createElement("div");
                        console.log(data);
                        var recipeImage = document.createElement("img");
                        recipeImage.className = "card-img-top";
                        recipeImage.setAttribute('src',data.image);                        
                        recipeImage.setAttribute('alt','Card image cap');
                        recipeImage.setAttribute('id','image');
                        card.appendChild(recipeImage);

                        var cardBlock = document.createElement("div");
                        cardBlock.className = "card-block";

                        var cardTitle = document.createElement("h5");
                        var node = document.createTextNode(data.title);
                        cardTitle.appendChild(node);
                        cardTitle.setAttribute('id','recipeName');
                        cardTitle.className = "card-title";
                        cardBlock.appendChild(cardTitle);

                        card.appendChild(cardBlock);

                        var ul = document.createElement("ul");
                        ul.className = "list-group list-group-flush";

                        var calories = document.createElement("li");
                        calories.innerHTML = "<span style=\"font-weight: bold\"> Calories: </span>" + data.nutrition.nutrients[0].amount;
                        calories.setAttribute('id','calories');
                        calories.className = "list-group-item";
                        ul.appendChild(calories);

                        var time = document.createElement("li");
                        time.innerHTML = "<span style=\"font-weight: bold\">Ready in: </span>" + data.readyInMinutes + " minutes";
                        time.setAttribute('id','time');
                        time.className = "list-group-item";
                        ul.appendChild(time);

                        card.appendChild(ul);

                        var cardBlock2 = document.createElement("div");
                        cardBlock2.className = "card-block";

                        var recipeLink = document.createElement("BUTTON");
                        recipeLink.className= "card-link btn btn-info btn-sm";
                        recipeLink.innerHTML = "<a target = \"_blank\" href = \"" + data.sourceUrl + "\">View Ricipe</a>"
                        recipeLink.setAttribute('id','link');
                        cardBlock2.appendChild(recipeLink);

                        var fav = document.createElement("BUTTON");
                        fav.setAttribute('id','favorite');
                        fav.className = "btn btn-success btn-sm";
                        fav.setAttribute('onclick','addFav();');
                        fav.onclick = function(){
                            addFav(data.id);
                            window.alert("Added to favorite");
                        };                        
                        fav.innerHTML = "<span class =\"glyphicon glyphicon-star\"></span> Add to Favorite ";
                        cardBlock2.appendChild(fav);

                        card.appendChild(cardBlock2);

                        card.setAttribute('id','recipeInfo');
                        card.className = "card col-md-4 col-sm-4 col-xs-4";

                        var element = document.getElementById("recipes");
                        element.appendChild(card);
                    },
                    error: function(err) { alert(err); },
                    beforeSend: function(xhr) {
                    xhr.setRequestHeader("X-Mashape-Authorization", "Iq8WHFs6VomshBya8vdSeZU7kL7mp1KlOLFjsnuKWX7TjWyclC"); // Enter here your Mashape key
                    }
                });
            }
        },
        error: function(err) { alert(err); },
        beforeSend: function(xhr) {

        xhr.setRequestHeader("X-Mashape-Authorization", "Iq8WHFs6VomshBya8vdSeZU7kL7mp1KlOLFjsnuKWX7TjWyclC"); // Enter here your Mashape key
        }
    });
}
var count = 0;
function addRecipe(id){
    favList.push(id);               
    var recipe = $.ajax({
        url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/'+ id +'/information?includeNutrition=true', // The URL to the API. You can get this by clicking on "Show CURL example" from an API profile
        type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
        data: {}, // Additional parameters here
        dataType: 'json',
        success: function(data) {
            var card = document.createElement("div");

            var recipeImage = document.createElement("img");
            recipeImage.className = "card-img-top";
            recipeImage.setAttribute('src',data.image);                        
            recipeImage.setAttribute('alt','Card image cap');
            recipeImage.setAttribute('id','image');
            card.appendChild(recipeImage);

            var cardBlock = document.createElement("div");
            cardBlock.className = "card-block";

            var cardTitle = document.createElement("h5");
            var node = document.createTextNode(data.title);
            cardTitle.appendChild(node);
            // cardTitle.setAttribute('class','recipeName');
            cardTitle.className = "card-title recipeName";
            cardBlock.appendChild(cardTitle);

            card.appendChild(cardBlock);

            var ul = document.createElement("ul");
            ul.className = "list-group list-group-flush";

            var calories = document.createElement("li");
            calories.innerHTML = "<span style=\"font-weight: bold\"> Calories: </span>" + data.nutrition.nutrients[0].amount;
            calories.setAttribute('id','calories');
            calories.className = "list-group-item";
            ul.appendChild(calories);

            var time = document.createElement("li");
            time.innerHTML = "<span style=\"font-weight: bold\"> Ready in: </span>" + data.readyInMinutes + " minutes";
            time.setAttribute('id','time');
            time.className = "list-group-item";
            ul.appendChild(time);

            card.appendChild(ul);

            var cardBlock2 = document.createElement("div");
            cardBlock2.className = "card-block";


            var recipeLink = document.createElement("BUTTON");
            recipeLink.className= "link card-link btn btn-info btn-sm";
            recipeLink.innerHTML = "<a target = \"_blank\" href = \"" + data.sourceUrl + "\">View Ricipe</a>"
            recipeLink.setAttribute('id','link');

           /* var recipeLink = document.createElement("a");
            recipeLink.setAttribute('href',data.sourceUrl);                        
            recipeLink.setAttribute('target','_blank');
            // recipeLink.setAttribute('class','link');
            recipeLink.innerHTML = "View Recipe";
            recipeLink.className = "card-link link";*/

            cardBlock2.appendChild(recipeLink);

            var rm = document.createElement("BUTTON");
            rm.setAttribute('id','removeFav');
            rm.className = "btn btn-danger btn-sm";
            rm.setAttribute('onclick','removeFav();');
            rm.onclick = function(){
                removeFav(data.id);
                element.removeChild(card);
                window.alert("Recipe Removed");
            };                        
            rm.innerHTML = "<span class =\"glyphicon glyphicon-trash\"></span> Remove ";
            cardBlock2.appendChild(rm);

            card.appendChild(cardBlock2);
            var br = document.createElement("BR");
            card.appendChild(br);

            card.setAttribute('id','favRecipeInfo');

            var cardBlock3 = document.createElement("div");
            cardBlock3.className = "card-block";

            
            var dates = document.createElement("p");
            dates.className = "card-link";
            dates.innerHTML = "Date: <input name = \"d\" type=\"text\" class=\"datepicker\">";
            cardBlock3.appendChild(dates);

            var times = document.createElement("p");
            times.className = "card-link";
            times.innerHTML = "Time: <input name = \"t\" type=\"text\" class=\"single-input\">";
            cardBlock3.appendChild(times);

            var br = document.createElement("BR");
            card.appendChild(br);

            var meal = document.createElement("BUTTON");
            meal.setAttribute('id','addMeal');
            meal.className = "btn btn-success btn-sm card-link";
            meal.setAttribute('onclick','addMeal();');
            meal.onclick = function(){
                     
                element.removeChild(card);
                window.alert("Recipe added to your calender");
                removeFav(data.id);

                  addMeal(document.getElementsByName("d"), document.getElementsByName("t"),document.getElementsByClassName("recipeName"),document.getElementsByClassName("link"));
                  // console.log(document.getElementsByClassName("recipeName"));

            };                        
            meal.innerHTML = "<span class =\"glyphicon glyphicon-plus\"></span> Add Meal ";
            cardBlock3.appendChild(meal);

            card.appendChild(cardBlock3);

            card.className = "card fav col-md-3 col-sm-3 col-xs-3";

            var element = document.getElementById("favorites2");
            element.appendChild(card);
        },
        error: function(err) { alert(err); },
        beforeSend: function(xhr) {
        xhr.setRequestHeader("X-Mashape-Authorization", "Iq8WHFs6VomshBya8vdSeZU7kL7mp1KlOLFjsnuKWX7TjWyclC"); // Enter here your Mashape key
        }
    });
}

var favList = [];
function addFav(id){
    if (favList.length == 0){
        addRecipe(id);
    } 
    else if(favList.indexOf(id) == -1){
        addRecipe(id);
    }

    else{
        alert("This Recipe is already on the list");
    }
}

function removeFav(id){
    favList.splice(favList.indexOf(id), 1);
}

var meals = [];
function addMeal(d, t, name,link){
    var date = (d[count].value).split("/");
    var splitDate = date[2] + "-" + date[0] + "-" + date[1];
    var meal = {
        title : name[count].innerHTML,
        url : link[count].href,
        start : splitDate+"T" + t[count].value

    };

    meals.push(meal);
    count++;
   console.log(meals);
}

