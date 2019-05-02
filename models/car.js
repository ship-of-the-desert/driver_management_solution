const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new Schema({
  name: String,
  image: String,
  model: String,
  doors: Number,
  purchased : Date
  // company: { type: Schema.Types.ObjectId, ref: 'Company'}

},{timestamps: true,_id : false, versionKey: false});


const Car = mongoose.model('Car', carSchema);
module.exports = Car;
module.exports.carSchema = carSchema;



