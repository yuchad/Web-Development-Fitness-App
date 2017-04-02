var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
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

/* Load main page */
router.get('/main', function(req, res, next) {
    var passedVariable = req.query.valid;
    var resultArray = [];
    var filteredArray = [];

    console.log(passedVariable);
    mongo.connect(url, function(err, db) {
      assert.equal(null, err);
      var cursor = db.collection('ingredients').find();
      cursor.forEach(function(doc, err) {
        assert.equal(null, err);
        resultArray.push(doc);
      }, function() {
        db.close();

        for (var i = 0; i < resultArray.length; i++) {
          var item = resultArray[i];
          filteredArray.push(item.title);
        }
        filteredArray = JSON.stringify(filteredArray);
        filteredArray = filteredArray.replace(/&quot;/g,"");
        res.render('main', {data: filteredArray, username: passedVariable});
      });
    });

  });

/* INSERT NEW USER TO DATABASE */
router.post('/newUser', function(req, res, next) {
  var item = {
    _id : req.body.username,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  };
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

router.post('/update', function(req, res, next) {
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };
  var id = req.body.id;

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('ingredients').updateOne({"_id": objectId(id)}, {$set: item}, function(err, result) {
      assert.equal(null, err);
      console.log('Item updated');
      db.close();
    });
  });
});

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

module.exports = router;
