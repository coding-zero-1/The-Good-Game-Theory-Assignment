import mongoose, { Schema } from "mongoose";

const bookSchema = new Schema({
  id: {
    type: Number,
    unique: true,
    default: Date.now(),
    required: true,
  },
  author: {
    type: String,
    trim: true,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  publishedYear:{
    type:Number,
    required:true,
    default: new Date().getFullYear
  }
});


const BookModel = mongoose.model('books',bookSchema);

export default BookModel;