import mongoose, { model, Schema } from 'mongoose'

mongoose.connect("mongodb+srv://dipanshuzalke:i68IrAukJyDQPbn1@cluster0.ujek8.mongodb.net/brainly")
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
})

export const UserModel = model('User', UserSchema)

const ContentSchema = new Schema({
  title: { type: String, required: true },
  link: { type: String, required: true },
  tags: [{type: mongoose.Types.ObjectId, ref: 'Tag'}],
  userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true }
})

export const ContentModel = model('Content', ContentSchema)
