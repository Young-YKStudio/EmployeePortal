import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
  tag: String,
  addedCount: Number,
},{timestamps: true})

const Tag = mongoose.models.Tag || mongoose.model('Tag', tagSchema)

export default Tag