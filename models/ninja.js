const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//geoschema
const GeoSchema = new Schema({
    type:{
        type: String,
        default: "Point"
    },
    coordinates:{
        type: [Number],
        index: "2dsphere"
    }
});
//create ninja schema and model

const NinjaSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required!'],
    },
    rank: {
        type: String,
    },
    available: {
        type: Boolean,
        default: false
    },
    geometry: GeoSchema
});
//will make a collection named ninja
const Ninja = mongoose.model('ninja', NinjaSchema);
module.exports = Ninja;