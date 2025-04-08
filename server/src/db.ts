import mongoose, { model, Schema } from 'mongoose'
import validator from 'validator';

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
  description: String,
  link: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => validator.isURL(value, { require_protocol: true }),
      message: (props: any) => `"${props.value}" is not a valid URL!`
    }
  },
  
  // tags: [{type: mongoose.Types.ObjectId, ref: 'Tag'}],
  type: { type: String, required: true },
  userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true }
})

export const ContentModel = model('Content', ContentSchema)

const LinkSchema = new Schema({
  hash : String,
  userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true, unique: true },
})

export const LinkModel = model('Link', LinkSchema)