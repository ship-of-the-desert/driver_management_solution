const router = require('express').Router()

    
    ////company routes
    router.post('/company/new', (req, res) => {

        let inputData = {
        name: req.body.name,
        image: req.body.image
        }
    
        Company.create(inputData)
        .then(() => {
        res.json({ message: "Company Added!"})
        return false
        })
        .catch(err => res.json({message: err}))
    })
    
    
    router.put('/company/:id/car/new', (req, res) => {
    
        let inputData = {
        cars : req.params.cars
        }
    
        Company.findOneAndUpdate(req.params.id,{ $push :{ cars: req.body.cars }})
        .then(() => {
        res.json({ message: "Company Added!"})
        return false
        })
        .catch(err => res.json({message: err}))
    })
    
    router.get('/company', (req, res) => {
    
        Company.find({})
        .populate({path: 'cars', model: 'Car'})
        .then(company =>{
        res.status(200).json({ company : company })
        return false
        })
        .catch(err => {
        res.json({ message: err })
        return false
        })
    })
    
    router.get('/company/:id', (req, res) => {
        //5cc3f985b274e02cb10ea4f4
        Company.findById(req.params.id)
        .populate('cars')
        .exec((err, company) =>{
        if (err){
            res.json({ message: err })
            return false;
        }
    
        res.status(200).json({company : company })
        return false
        })
    })

    module.exports = router