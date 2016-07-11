var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/Products');
console.log('hi');
console.log(db);
 
/* GET All Todos */
router.get('/Departments', function(req, res, next) {
     var collection = db.collection('Departments');
    collection.find().toArray(function(err, departments) {
        if (err) {
            res.send(err);
        } else {
            res.json(departments);
        }
    });
});
 
 router.get('/Products/:startIndex', function(req, res, next) {
     var startIndex = req.params.startIndex;
     var collection = db.collection('ProductsByDepartment')
    collection.find().skip(startIndex*50).limit(50).toArray(function(err, departments) { 
        if (err) {
            res.send(err);
        } else {
            res.json(departments);
        }
    });
});

 router.get('/Menus/:country', function(req, res, next) {
     var country = req.params.country;
     var collection = db.collection('ProductsByDepartment');
    collection.distinct("vendor", {"country":country}, function(err, departments) {   
        if (err) {
            res.send(err);
        } else {
            res.json(departments);
        }
    });
});
 

 router.get('/SideMenus/:country/:vendor', function(req, res, next) {
     var country = req.params.country;
      var vendor = req.params.vendor;
       var collection = db.collection('ProductsByDepartment');
      if(vendor == undefined)
      {
         collection.distinct("department", {"country":country}, function(err, departments) {   
        if (err) {
            res.send(err);
        } else {
            res.json(departments); 
        }
    });
      }
      else{
          collection.distinct("department", {"country":country, "vendor":vendor}, function(err, departments) {   
        if (err) {
            res.send(err);
        } else {
            res.json(departments);
        }
    });
      }
    
    
});
/* PUT/UPDATE a Todo */
router.put('/Department/:dept_id', function(req, res, next) {
    var todo = req.body;
    var updObj = {};
 
    if (todo.isCompleted) {
        updObj.isCompleted = todo.isCompleted;
    }
    if (todo.text) {
        updObj.text = todo.text;
    }
 
    if (!updObj) {
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    } else {
        db.todos.update({
            _id: mongojs.ObjectId(req.params.id)
        }, updObj, {}, function(err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        });
    }
 
 
});
 
/* DELETE a Todo */
router.delete('/Department/:dept_id', function(req, res) {
    db.todos.remove({
        _id: mongojs.ObjectId(req.params.id)
    }, '', function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    });
 
});
 
module.exports = router;