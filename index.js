const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const app = express(); //initialize express
const PORT = process.env.PORT || 5000; //define port

//models
const Driver = require('./models/driver');
const Company = require('./models/company');
const Car = require('./models/car');

//Body parser allows json to be passed into express
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//connect to mongoose
mongoose.connect('mongodb://localhost/driver_management',{useNewUrlParser: true}).then(()=> {console.log('db connected')}, err => { console.log(err)})
//fix database index from deprecated mongoose
mongoose.set('useCreateIndex', true)

//driver routes
app.get('/', (req, res) => {

  Driver.find({}).then(driver =>{
    res.status(200).json({drivers : driver })
  })
  .catch(err => {
    res.json({ message: err })
  })
  res.json({message: "root page"})
})


//driver routes
app.get('/drivers', (req, res) => {
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

app.get('/drivers/:id', (req, res) => {
  //find drivers
  Driver.findById(req.params.id)
  // .populate('cars')
  .then(driver => {
    res.json({driver:driver, message: "suc"})
  }).catch(err => {
    res.json({message: err })
  })
})

app.post('/drivers/new', (req, res) => {
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

app.put('/driver/:id', (req, res) => {
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
// {
// 	"cars" : "5cc3d7fbc4d7f129d8eef709",
// 	"fuel": "half",
//   "picked": "2019/03/04",
//   "dropped": "2019/03/05"
// }


// {
//     "firstname": "Okon",
//     "lastname": "Abdullah",
//     "age": 30,
//     "image": "https://m.easyaupair.com/Photo/small_aupair_d338b414d261a292cf3db541c57fec59.jpg"
//   }
//
//add car to drivers
app.put('/drivers/:id/cars/add', (req, res) => {
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

//car routes
app.post('/cars/new', (req, res) => {

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

app.get('/cars', (req, res) => {

  Car.find({}).then(car =>{
    res.status(200).json({ count:car.length, cars : car })
    return false
  })
  .catch(err => {
    res.json({ message: err })
    return false
  })
})

////company routes
app.post('/company/new', (req, res) => {

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


app.put('/company/:id/car/new', (req, res) => {

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

app.get('/company', (req, res) => {

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

app.get('/company/:id', (req, res) => {
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


//start server on port 5000
app.listen(PORT, ()=> console.log(`running on ${PORT}`))
