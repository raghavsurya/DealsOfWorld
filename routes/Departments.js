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
 
 router.get('/Products', function(req, res, next) {
     var collection = db.collection('ProductsByDepartment')
    collection.find().limit(50).toArray(function(err, departments) {
        if (err) {
            res.send(err);
        } else {
            res.json(departments);
        }
    });
});

router.get('/Departments/:dept_id', function(req, res, next) {
      var collection = db.collection('Departments');
      
    collection.findOne({dept_id :3
    }, function(err, todos) {
        if (err) {
            res.send(err);
        } else {
            res.json(todos);
        }
    });
});
 
/* POST/SAVE a Todo */
router.post('/Department', function(req, res, next) {
    var todo = req.body;
    if (!todo.text || !(todo.isCompleted + '')) {
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    } else {
        db.todos.save(todo, function(err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        })
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