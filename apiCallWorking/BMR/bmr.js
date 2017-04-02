
function calcIt(){
	var activity = document.getElementById("activity");
	var genderType = document.getElementById("gender");
var age = document.getElementById("age");
var weight = document.getElementById("weight");
var height = document.getElementById("height");


	var cal;
	var bmr;

	if(genderType.value == "female"){
		bmr = 10 * parseInt(weight.value)+
		 6.25 * parseInt(height.value) -
		  5 * parseInt(age.value) - 161;
	}
	else if(genderType.value == "male"){
		bmr = 10 * parseInt(weight.value)+ 
		6.25 * parseInt(height.value) - 5 * 
		parseInt(age.value)+5;
	}


	if (document.getElementById("a").checked) {
  	cal = document.getElementById("a").value * bmr;
	}

	if (document.getElementById("b").checked) {
  	cal = document.getElementById("b").value * bmr;
	}

	if (document.getElementById("c").checked) {
  	cal = document.getElementById("c").value * bmr;
	}

	if (document.getElementById("d").checked) {
  	cal = document.getElementById("d").value* bmr;
	}

	if (document.getElementById("e").checked) {
  	cal = document.getElementById("e").value * bmr;
	}

	var goal;

	if (document.getElementById("loseHalf").checked) {
  	goal = cal- document.getElementById("loseHalf").value  ;
	}

	if (document.getElementById("loseOne").checked) {
  	goal = cal - document.getElementById("loseOne").value;
	}

	if (document.getElementById("gainHalf").checked) {
  	goal = cal - document.getElementById("gainHalf").value ;
	}

	if (document.getElementById("gainOne").checked) {
  	goal = cal - document.getElementById("gainOne").value;
	}

document.getElementById("detail").innerHTML = "Your total calories a day to maintain your weight is " + parseFloat(cal).toFixed(2) + ". To get your goal you need " + parseFloat(goal).toFixed(2);
	
	console.log(bmr);
	console.log(parseFloat(cal).toFixed(2));
	console.log(parseFloat(goal).toFixed(2));

}