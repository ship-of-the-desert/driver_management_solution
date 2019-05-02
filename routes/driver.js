    const express = require('express')
    const router = express.Router()
    const Car = require('../models/car');
    const Driver = require('../models/driver').Driver;
    
    //driver routes
        router.get('/', (req, res) => {

            Driver.find({}).then(driver =>{
            res.status(200).json({drivers : driver })
            })
            .catch(err => {
            res.json({ message: err })
            })
            res.json({message: "root page"})
        })
        
        
        //driver routes
        router.get('/drivers', (req, res) => {
            Driver.find({})
            // .populate('cars')
            .then(driver =>{
            res.status(200).json({ count:driver.length, drivers : driver })
            return false
            })
            .catch(err => {
            res.json({ message: err })
            return false
            })
        
        })
        
        router.get('/drivers/:id', (req, res) => {
            //find drivers
            Driver.findById(req.params.id)
            // .populate('cars')
            .then(driver => {
            res.json({driver:driver, message: "suc"})
            }).catch(err => {
            res.json({message: err })
            })
        })
        
        router.post('/drivers/new', (req, res) => {
            //find drivers
            let inputData = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            age: req.body.age,
            image: req.body.image
            }
        
            let driver = new Driver(inputData)
        
            driver.save().then(() => {
            res.json({ message: "Driver Added!"})
            return false
            })
            .catch(err => {
                res.json({ message: err})
            })
        
        })
        
        router.put('/driver/:id', (req, res) => {
            //find drivers 5cc31a3ba5893a210fa23428"
            let inputData = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            age: req.body.age,
            image: req.body.image
            }
        
            Driver.findOneAndUpdate({_id: req.params.id},{$set:inputData}).then(driver => {
            res.status(200).json({...driver})
            }).catch(err => {
            res.json({message: err })
            })
        })

        //add car to drivers
        router.put('/drivers/:id/cars/add', (req, res) => {
            let inputData = {
            car:req.body.car,
            fuel:req.body.fuel,
            picked:req.body.picked,
            dropped: req.body.dropped
            }
        
            Car.findById(req.params.car).then(car => {
            //find drivers
            Driver.findOneAndUpdate({_id: req.params.id},{$push:{ cars: inputData}})
            .then(driver => {
                res.status(200).json({message: "updated"})
            }).catch(err => {
                res.json({message: err })
            })
            }).catch(err => {
            res.json({message: err })
            })
        })

        module.exports = router
        