const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LibrarySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  podcasts: [
    {
      title: {
        type: String,
        required: true
      },
      author: {
        type: String,
        required: true
      },
      feed: {
        type: String,
        required: true
      },
      image: {
        type: String,
        require: true
      }
    }
  ]
});

module.exports = Profile = mongoose.model("library", LibrarySchema);
