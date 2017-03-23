var ingredients;

window.onload = function(){
  var input = document.getElementById("search");
  new Awesomplete(input, {
    list: ["Ada", "Java", "JavaScript", "Brainfuck", "LOLCODE", "Node.js", "Ruby on Rails"]
  });
  console.log("Suggestion bar ready");


}


//mines the file contents pretty much, not to touch
function fileUpload(){
    var x = document.getElementById("myFile");
    var txt = "";

    if ('files' in x) {
        if (x.files.length == 0 || x.files.length > 1) {
            alert("Select one file only.");
        } else{
              sendToController(x.files.item(0));
            }
        }
    else {
        if (x.value == "") {
              alert("Select one file only.");
        } else {
            alert("The files property is not supported by your browser!");
            txt  += "<br>The path of the selected file: " + x.value; // If the browser does not support the files property, it will return the path of the selected file instead.
        }
    }
}

//sends file contents to angular method parseFile()
function sendToController(file) {
  var existingList;

  var reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function(e) {
    existingList = e.target.result;
    ingredients = existingList.split("\n");
    console.log(ingredients);
  }
}
