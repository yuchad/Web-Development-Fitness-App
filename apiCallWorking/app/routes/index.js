var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var cookie = require('cookie');
var assert = require('assert');

var url = 'mongodb://localhost:27017/test';

/* GET home page. */
router.get('/', function(req, res, next) {
      var passedVariable = req.query.valid;
      if(passedVariable){
        res.render('index', {data: passedVariable});
      }
      else {
        res.render('index');
      }
    });


/* GET settings page. */
router.get('/setting', function(req, res, next) {
        res.render('setting');
  });


/* Load main page */
router.get('/main', function(req, res, next) {
    var passedVariable = req.query.valid;
    var valueNow;
    var resultArray = [];
    var filteredArray = [];

    mongo.connect(url, function(err, db) {
      assert.equal(null, err);

      var cursor = db.collection('ingredients').find();
      cursor.forEach(function(doc, err) {
        assert.equal(null, err);
        resultArray.push(doc);
      }, function() {
          var user = db.collection('userData').findOne({"_id": passedVariable},function(err, doc) {
            db.close();
            for (var i = 0; i < resultArray.length; i++) {
              var item = resultArray[i];
              filteredArray.push(item.title);
            }
            filteredArray = JSON.stringify(filteredArray);
            filteredArray = filteredArray.replace(/&quot;/g,"");
            res.render('main', {data: filteredArray, username: doc.username});
        });
      });
    });

  });

/* INSERT NEW USER TO DATABASE */
router.post('/newUser', function(req, res, next) {
  var bmrNew = bmr(req.body.gender, req.body.age, req.body.height, req.body.weight, req.body.activityLevel, req.body.goal);

  var item = {
    _id : req.body.username,
    username: req.body.username,
    email: req.body.email,
    height: req.body.height,
    weight: req.body.weight,
    goal: req.body.goal,
    age: req.body.age,
    gender: req.body.gender,
    activityLevel: req.body.activityLevel,
    maintain: bmrNew.maintain,
    goal: bmrNew.goal,
    password: req.body.password
  };
  console.log(item);
    mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('userData').insertOne(item, function(err, result) {
      if ( err ) throw err;
      console.log('Item inserted');
      db.close();
    });
  });
    res.redirect('/');
});


/* UPDATE USER SETTINGS */
router.post('/updateUser', function(req, res, next) {
  var bmrNew = bmr(req.body.gender, req.body.age, req.body.height, req.body.weight, req.body.activityLevel, req.body.goal);

  var item = {
    _id : req.body.username,
    username: req.body.username,
    email: req.body.email,
    height: req.body.height,
    weight: req.body.weight,
    goal: req.body.goal,
    age: req.body.age,
    gender: req.body.gender,
    activityLevel: req.body.activityLevel,
    maintain: bmrNew.maintain,
    goal: bmrNew.goal,
    password: req.body.password
  };
  console.log(item);
    mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('userData').updateOne({"_id": item.username}, item, function(err, result) {
      if ( err ) throw err;
      console.log('Item updated');
      db.close();
    });
  });
    var string = encodeURIComponent(item.username);
    res.redirect('main' + '/?valid=' + string);
});

/* logout */
router.post('/logout', function(req, res, next) {
        res.redirect('/');
  });

/* redirect to settings page. */
router.post('/settings', function(req, res, next) {
        res.redirect('setting');
  });

/* LOG INTO MAIN INTERFACE */
router.post('/logged-in', function(req, res, next) {
  var authenticated = false;
  var username;
  var item = {
    username: req.body.username,
    password: req.body.password
  };

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    var cursor = db.collection('userData').find();
    cursor.forEach(function(doc, err) {
      assert.equal(null, err);
      if(doc.username == item.username && doc.password == item.password){
        console.log("exists");
        authenticated = true;
        username = doc.username;
      }
      else {
          console.log("doesnt exist");
      }
    }, function() {
      db.close();
      var string = encodeURIComponent(username);
      var stringError = encodeURIComponent("You dont exist in our database bitch");

      if(authenticated){
        res.redirect('main' + '/?valid=' + string);
      }
      else {
        res.redirect('/?valid=' + stringError);
      }
    });
  });
});


router.get('/get-data', function(req, res, next) {
  var resultArray = [];
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    var cursor = db.collection('ingredients').find();
    cursor.forEach(function(doc, err) {
      assert.equal(null, err);
      resultArray.push(doc);
    }, function() {
      db.close();
      res.render('index', {items: resultArray});
    });
  });
});


router.post('/insert', function(req, res, next) {

//var i = 0
//for(i = 0; i < item.length; i++){

  //var obj = { title: item[i] };

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('ingredients').insertMany(item);
    db.close();
  });
//}
res.redirect('/');
});


/*
router.post('/insert', function(req, res, next) {
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('user-data').insertOne(item, function(err, result) {
      assert.equal(null, err);
      console.log('Item inserted');
      db.close();
    });
  });

  res.redirect('/');
});
*/


router.post('/delete', function(req, res, next) {
  var id = req.body.id;

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('user-data').deleteOne({"_id": objectId(id)}, function(err, result) {
      assert.equal(null, err);
      console.log('Item deleted');
      db.close();
    });
  });
});



function bmr(genderType, age, height, weight, activityLevel, losingGoal){
  var cal,goal,bmr;
  console.log(genderType);
  console.log(age);
  console.log(height);
  console.log(weight);
  console.log(activityLevel);
  console.log(losingGoal);

	if(genderType == "female"){
		bmr = 10 * parseInt(weight)+
		 6.25 * parseInt(height) -
		  5 * parseInt(age) - 161;
	}
	else if(genderType == "male"){
		bmr = 10 * parseInt(weight)+
		6.25 * parseInt(height) - 5 *
		parseInt(age)+5;
	}


	cal = parseInt(activityLevel) * bmr;
  goal = cal - parseInt(losingGoal);

	var maintainCals = parseFloat(cal).toFixed(2);
  var goalCals = parseFloat(goal).toFixed(2);

  return {maintain: maintainCals, goal: goalCals};
}

module.exports = router;
