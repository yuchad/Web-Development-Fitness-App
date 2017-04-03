function doIt(ingredients) {
    var recipeID, recipeTitle;
    var output = $.ajax({
        url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=' + ingredients + '&limitLicense=false&number=10&ranking=1', // The URL to the API. You can get this by clicking on "Show CURL example" from an API profile
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
                        console.log(data);
                        var recipeDIV = document.createElement("div");

                        var name = document.createElement("h4");
                        var node = document.createTextNode(data.title);
                        name.appendChild(node);
                        name.setAttribute('id','recipeName');
                        recipeDIV.appendChild(name);

                        var recipeLink = document.createElement("a");
                        recipeLink.setAttribute('href',data.sourceUrl);                        
                        recipeLink.setAttribute('target','_blank');
                        recipeLink.setAttribute('id','link');
                        recipeLink.innerHTML = "<img id = \"image\" src =" + data.image + ">";
                        recipeDIV.appendChild(recipeLink);

                        var calories = document.createElement("p");
                        var node = document.createTextNode("Calories: " + data.nutrition.nutrients[0].amount);
                        calories.appendChild(node);
                        calories.setAttribute('id','calories');
                        recipeDIV.appendChild(calories);

                        var time = document.createElement("p");
                        var node = document.createTextNode("Ready in: " + data.readyInMinutes + " minutes");
                        time.appendChild(node);
                        time.setAttribute('id','time');
                        recipeDIV.appendChild(time);

                        var fav = document.createElement("BUTTON");
                        fav.setAttribute('id','favorite');
                        fav.className = "btn btn-default btn-sm";
                        fav.setAttribute('onclick','addFav();');
                        fav.onclick = function(){
                            addFav(data.id);
                        };
                        
                        fav.innerHTML = "<span class =\"glyphicon glyphicon-star\"></span>";

                        recipeDIV.appendChild(fav);
                        recipeDIV.setAttribute('id','recipeInfo');
                        recipeDIV.className = "col-md-6 col-sm-6 col-xs-6";

                        var element = document.getElementById("recipes");
                        element.appendChild(recipeDIV);
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

var favList = [];
function addFav(id){
    if (favList.length == 0){
        addRecipe(id);
    } 
    else if(favList.indexOf(id) == -1){
        addRecipe(id);
    }

    else{
        alert("its already on the fav list");
    }
}

function removeFav(id){
    favList.splice(favList.indexOf(id), 1);
    console.log(favList);
}

function addRecipe(id){
    favList.push(id);               
    var recipe = $.ajax({
        url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/'+ id +'/information?includeNutrition=true', // The URL to the API. You can get this by clicking on "Show CURL example" from an API profile
        type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
        data: {}, // Additional parameters here
        dataType: 'json',
        success: function(data) {
            //console.log(data);
            var recipeDIV = document.createElement("div");

            var name = document.createElement("h4");
            var node = document.createTextNode(data.title);
            name.appendChild(node);
            name.setAttribute('id','recipeName');
            recipeDIV.appendChild(name);

            var recipeLink = document.createElement("a");
            recipeLink.setAttribute('href',data.sourceUrl);                        
            recipeLink.setAttribute('target','_blank');
            recipeLink.setAttribute('id','link');
            recipeLink.innerHTML = "<img id = \"image\" src =" + data.image + ">";
            recipeDIV.appendChild(recipeLink);

            var calories = document.createElement("p");
            var node = document.createTextNode("Calories: " + data.nutrition.nutrients[0].amount);
            calories.appendChild(node);
            calories.setAttribute('id','calories');
            recipeDIV.appendChild(calories);

            var time = document.createElement("p");
            var node = document.createTextNode("Ready in: " + data.readyInMinutes + " minutes");
            time.appendChild(node);
            time.setAttribute('id','time');
            recipeDIV.appendChild(time);

            var rm = document.createElement("BUTTON");
            rm.setAttribute('id','removeFav');
            rm.className = "btn btn-default btn-sm";
            rm.setAttribute('onclick','removeFav();');
            rm.innerHTML = "<span class =\"glyphicon glyphicon-trash\"></span>";
            recipeDIV.appendChild(rm);

            var dateTime = document.createElement("div");
            dateTime.innerHTML = "<p>Date: <input type=\"text\" class=\"datepicker\"></p>" +
                "<input class=\"single-input\" value=\"\" placeholder=\"Now\">"
            recipeDIV.appendChild(dateTime);

            var br = document.createElement("BR");
            recipeDIV.appendChild(br);
            recipeDIV.className = "col-md-4 col-sm-4 col-xs-4";

            var element = document.getElementById("favorites2");
            element.appendChild(recipeDIV);
            
            

            recipeDIV.setAttribute('id','FavRecipeInfo')
            rm.onclick = function(){
                removeFav(data.id);
                element.removeChild(recipeDIV);
            };
        },
        error: function(err) { alert(err); },
        beforeSend: function(xhr) {
        xhr.setRequestHeader("X-Mashape-Authorization", "Iq8WHFs6VomshBya8vdSeZU7kL7mp1KlOLFjsnuKWX7TjWyclC"); // Enter here your Mashape key
        }
    });
}

