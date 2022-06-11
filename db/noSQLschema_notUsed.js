import mongoose from 'mongoose';
const { Schema } = mongoose;

const QuestionsSchema = new Schema({
  id: Number, // String is shorthand for {type: String}
  product_id: Number,
  question_body: String,
  question_date: String,
  asker_name: String,
  question_helpfulness: Number,
  reported: Boolean,
  answers: {
    type: Schema.Types.ObjectId,
    ref: "Answers"
  }
});

const AnswersSchema = new Schema({
  id: Number, // String is shorthand for {type: String}
  body: String,
  date: String,
  answerer_name: String,
  question_helpfulness: Number,
  photos: {
    type: Schema.Types.ObjectId,
    ref: "Photos"
  }
});

const PhotosSchema = new Schema({
  id: Number, // String is shorthand for {type: String}
  url: String,
});

var Questions = mongoose.model("Questions", QuestionsSchema);
var Answers = mongoose.model("Answers", AnswersSchema);
var Photos = mongoose.model("Photos", PhotosSchema);



