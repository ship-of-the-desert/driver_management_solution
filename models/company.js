const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const carId = { type: Schema.Types.ObjectId, ref: 'Car'}

const companySchema = new Schema({
  name: {type: String, unique: true},
  image: {type: String},
  cars:[carId],
  drivers: [
    { type: Schema.Types.ObjectId, ref: 'Driver'},
  ]
},{timestamps: true,versionKey: false});

companySchema.plugin(uniqueValidator);

const Company = mongoose.model('Company', companySchema);
module.exports = Company;
