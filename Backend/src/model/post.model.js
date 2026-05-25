const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  text: String,
  caption : String,
  content: String,
  status: {
    type: String,
    enum : ["draft", "Published", "publish"]
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: false
  }
}, { timestamps: true })

const postModel = mongoose.model("post", postSchema)
module.exports = postModel