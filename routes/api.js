const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninja');

//get list of ninjas
router.get('/ninjas', function(req, res, next){
    // Ninja.find({}).then(function(ninjas){
    //     res.send(ninjas);
    // });
    Ninja.aggregate([
        {
          $geoNear: {
            near: {
              type: "point",
              coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
            },
            spherical: true,
            maxdistance: 100000,
            distanceField: "dist.calulated",
          },
        },
      ])
        .then(function (ninjas) {
          res.send(ninjas);
        })
        .catch(next);
    });

//add new in db
router.post('/ninjas', function(req, res, next){
    // var ninja = new Ninja(req.body);
    // ninja.save();

    //this is a promise
    Ninja.create(req.body).then(function(ninja){
        res.send({ninja})
    }).catch(next); 
    
});

//update in db
router.put('/ninjas/:id', function(req, res, next){
    Ninja.findByIdAndUpdate({_id: req.params.id}, req.body).then(function () {
        Ninja.findOne({_id:req.params.id}).then(function(ninja){
                res.send(ninja);
            }
        )
    }).catch(function(error){
        res.send(error);
    });
});

//delete in db
router.delete('/ninjas/:id', function(req, res, next){
    console.log(req.params);
    Ninja.findByIdAndRemove({_id: req.params.id}).then(function (ninja) {
        res.send(ninja);
    }).catch(function(error){
        res.send(error);
    });
});

module.exports = router;