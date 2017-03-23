/*
function doIt() { 
 var output = $.ajax({
    url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=apples%2Cflour%2Cbacon%2Ccheese%2Colives&limitLicense=false&number=5&ranking=1', // The URL to the API. You can get this by clicking on "Show CURL example" from an API profile
    type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
    data: {}, // Additional parameters here
    dataType: 'json',
    success: function(data) {
    	//
        //Change data.source to data.something , where something is whichever part of the object you want returned.
        //To see the whole object you can output it to your browser console using:
        //console.log(data);
      
       	document.getElementById("output").innerHTML = data[0].title;
       	 document.getElementById("outputID").innerHTML = data[0].id;
       	console.log(data);
        },
    error: function(err) { alert(err); },
    beforeSend: function(xhr) {
    xhr.setRequestHeader("X-Mashape-Authorization", "Iq8WHFs6VomshBya8vdSeZU7kL7mp1KlOLFjsnuKWX7TjWyclC"); // Enter here your Mashape key
    }
});

 var recipe = $.ajax({
    url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/420337/information?includeNutrition=false', // The URL to the API. You can get this by clicking on "Show CURL example" from an API profile
    type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
    data: {}, // Additional parameters here
    dataType: 'json',
    success: function(data) {
    	//
        //Change data.source to data.something , where something is whichever part of the object you want returned.
        //To see the whole object you can output it to your browser console using:
        //console.log(data);
      
        document.getElementById("recipe").innerHTML = data.readyInMinutes;
       	console.log(data);
        },
    error: function(err) { alert(err); },
    beforeSend: function(xhr) {
    xhr.setRequestHeader("X-Mashape-Authorization", "Iq8WHFs6VomshBya8vdSeZU7kL7mp1KlOLFjsnuKWX7TjWyclC"); // Enter here your Mashape key
    }
});
}
*/
function getIng(){
 var ingredient = document.getElementById("ing").value;
 
 var ingredients = [];
 ingredients.push(ingredient);

 console.log(ingredients);
 }
