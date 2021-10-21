const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const reviewSchema = new Schema({
    content: String,
    rating: {type: Number, min: 1, max: 5, default: 5},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    userName: String,
    userAvatar: String
  }, {
    timestamps: true
  });

const businessSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    image_URL: String,
    address: String,
    link: String,
    phone: String,
    email: String,
    category: String,
    reviews: [reviewSchema],
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    favs: [{type: Schema.Types.ObjectId, ref: 'User'}]
}, {
    timestamps: true
  });

module.exports = mongoose.model('Business', businessSchema);