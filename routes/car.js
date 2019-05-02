    
        const express = require('express')
        const router = express.Router()
        const Car = require('../models/car');
        const Driver = require('../models/driver').Driver;
    //car routes
        router.post('/cars/new', (req, res) => {

            let inputData = {
            name: req.body.name,
            image: req.body.image,
            model: req.body.model,
            doors: req.body.doors,
            purchased : req.body.purchased,
            }
        
            Car.create(inputData)
            .then(() => {
            res.json({ message: "Car Added!"})
            return false
            })
            .catch(err => res.json({message: err}))
        
            // car.save()
        })
        
        router.get('/cars', (req, res) => {
        
            Car.find({}).then(car =>{
            res.status(200).json({ count:car.length, cars : car })
            return false
            })
            .catch(err => {
            res.json({ message: err })
            return false
            })
        })
        
        module.exports = router