var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/Products');

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/* GET All Todos */
router.get('/Departments', function (req, res, next) {

    var collection = db.collection('Departments');
    collection.find().toArray(function (err, departments) {
        if (err) {
            res.send(err);
        } else {
            res.json(departments);
        }
    });
});

router.get('/Products/:startIndex/:country', function (req, res, next) {
    var startIndex = req.params.startIndex;
    var countryToFind = new RegExp([req.params.country].join(""), "i");
    var collection = db.collection('ProductsByDepartment')
    collection.find({ country: countryToFind }).skip(startIndex * 50).limit(50).toArray(function (err, departments) {
        if (err) {
            res.send(err);
        } else {
            res.json(departments);
        }
    });
});

router.get('/Menus/:country', function (req, res, next) {
    //var startIndex = new RegExp([req.params.startIndex].join(""), "i");
    var country = new RegExp([req.params.country].join(""), "i");
    var collection = db.collection('ProductsByDepartment');
    collection.distinct("vendor", { "country": country }, function (err, departments) {
        if (err) {
            res.send(err);
        } else {
            res.json(departments);
        }
    });
});




router.get('/GetAllSideMenus/:country', function (req, res, next) {
    //var startIndex = new RegExp([req.params.startIndex].join(""), "i");
    var country = new RegExp([req.params.country].join(""), "i");
    var collection = db.collection('ProductsByDepartment');
    collection.aggregate.toArray([
        { $match: { country: country } },
        { $group: { _id: { Vendor: "$vendor", Department: "$department" } } }
    ], function (err, departments) {
        if (err) {
            res.send(err);
        } else {
            res.json(departments.toArray());
        }
    });
});


router.get('/SideMenus/:country/:vendor', function (req, res, next) {


    var vendor = new RegExp([req.params.vendor].join(""), "i");
    var collection = db.collection('ProductsByDepartment');
    if (vendor == undefined || vendor == "all") {
        var country = new RegExp([req.params.country].join(""), "i");

        collection.distinct("department", { "country": country, "vendor": vendor }, function (err, departments) {
            if (err) {
                res.send(err);
            } else {
                res.json(departments);
            }
        });
    }
    else {
        var country = new RegExp([req.params.country].join(""), "i");
        var vendor = new RegExp([req.params.vendor].join(""), "i");
        collection.distinct("department", { "country": country, "vendor": vendor }, function (err, departments) {
            if (err) {
                res.send(err);
            } else {
                res.json(departments);
            }
        });
    }


});

router.get('/ProductsByDept/:startIndex/:country/:department', function (req, res, next) {
    var country = new RegExp([req.params.country].join(""), "i");
    var dept = new RegExp([req.params.department].join(""), "i");
    var startIndex = req.params.startIndex;
    var collection = db.collection('ProductsByDepartment');

    collection.find({ country: country, department: dept }).skip(startIndex * 50).limit(50).toArray(function (err, departments) {
        if (err) {
            res.send(err);
        } else {
            res.json(departments);
        }
    });

});

router.get('/ProductsBySearchTerm/:startIndex/:country/:searchTerm', function (req, res, next) {
    var search = req.params.searchTerm;
    var country = new RegExp([req.params.country].join(""), "i");
    var startIndex = req.params.startIndex;
    var regex = new RegExp([".*", search, ".*"].join(""), "i");
    var collection = db.collection('ProductsByDepartment');

    collection.find({ country: country, productText: regex }).skip(startIndex * 50).limit(50).toArray(function (err, departments) {
        if (err) {
            res.send(err);
        } else {
            res.json(departments);
        }
    });

});

router.get('/ProductsByDeptByVendor/:startIndex/:country/:department/:vendor/:sortBy', function (req, res, next) {
    var country = new RegExp([req.params.country].join(""), "i");
    var dept = new RegExp([req.params.department].join(""), "i");
    var vendor = new RegExp([req.params.vendor].join(""), "i");
    var sortBy = new RegExp([req.params.vendor]);
    var startIndex = req.params.startIndex;
    var collection = db.collection('ProductsByDepartment');


  
        if (sortBy == 'hightolow') {
            collection.find({ country: country, department: dept, vendor: vendor }).sort( { offerPrice: -1 } ).skip(startIndex * 50).limit(50).toArray(function (err, departments) {
                if (err) {
                    res.send(err);
                } else {
                    res.json(departments);
                }
            });
        }
        else if (sortBy == 'lowtohigh') {
            collection.find({ country: country, department: dept, vendor: vendor }).sort( { offerPrice: 1 } ).skip(startIndex * 50).limit(50).toArray(function (err, departments) {
                if (err) {
                    res.send(err);
                } else {
                    res.json(departments);
                }
            });
        }
    else {
        collection.find({ country: country, department: dept, vendor: vendor }).skip(startIndex * 50).limit(50).toArray(function (err, departments) {
            if (err) {
                res.send(err);
            } else {
                res.json(departments);
            }
        });
    }


});



router.get('/ProductsByVendor/:startIndex/:country/:vendor', function (req, res, next) {
    var country = new RegExp([req.params.country].join(""), "i");
    var startIndex = req.params.startIndex;
    var vendor = new RegExp([req.params.vendor].join(""), "i");

    var collection = db.collection('ProductsByDepartment');

    collection.find({ country: country, vendor: vendor }).skip(startIndex * 50).limit(50).toArray(function (err, departments) {
        if (err) {
            res.send(err);
        } else {
            res.json(departments);
        }
    });

});
/* PUT/UPDATE a Todo */
router.put('/Department/:dept_id', function (req, res, next) {
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
        }, updObj, {}, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        });
    }


});

/* DELETE a Todo */
router.delete('/Department/:dept_id', function (req, res) {
    db.todos.remove({
        _id: mongojs.ObjectId(req.params.id)
    }, '', function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    });

});

module.exports = router;