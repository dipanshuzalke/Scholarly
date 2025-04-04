import express from 'express'
import jwt from 'jsonwebtoken'
import { UserModel, ContentModel, LinkModel } from './db'
import { JWT_PASSWORD } from './config'
import { userMiddleware } from './middleware'
import { random } from './utils'
import cors from 'cors'
import mongoose from 'mongoose'

const app = express()
app.use(express.json())
app.use(cors())

app.post('/api/v1/signup', async (req, res) => {
  //zod validation, hash the password
  const username = req.body.username
  const password = req.body.password

  try {
    await UserModel.create({
      username,
      password
    })

    res.json({
      message: 'User created successfully'
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

app.post('/api/v1/signin', async (req, res) => {
  const username = req.body.username
  const password = req.body.password

  const existingUser = await UserModel.findOne({
    username,
    password
  })

  if (existingUser) {
    const token = jwt.sign(
      {
        id: existingUser._id
      },
      JWT_PASSWORD
    )
    res.json({
      token,
      message: 'User signed in successfully'
    })
  } else {
    res.status(401).json({
      message: 'Invalid credentials'
    })
  }
})

app.post('/api/v1/content', userMiddleware, async (req, res) => {
  const title = req.body.title
  const link = req.body.link
  const type = req.body.type
  const description = req.body.description

  try {
    await ContentModel.create({
      title,
      link,
      type,
      description,
      // @ts-ignore
      userId: req.userId
    })

    res.json({
      message: 'Content created successfully'
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// app.get('/api/v1/content', userMiddleware, async (req, res) => {
//   // @ts-ignore
//   const userId = req.userId
//   const content = await ContentModel.find({
//     userId
//   }).populate('userId', 'username')
//   res.json({
//     content
//   })
// })

app.get('/api/v1/content', userMiddleware, async (req, res) => {
  try {
    const { type } = req.query;

    // Use a flexible object type to allow adding keys dynamically
    const query: Record<string, any> = {
      // @ts-ignore
      userId: req.userId
    };

    if (type) {
      query.type = type; // ✅ No TS error now
    }

    const content = await ContentModel.find(query);

    res.json({ content });
  } catch (error) {
    console.error("❌ Error fetching content:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


app.delete('/api/v1/content', userMiddleware, (req, res) => {
  const contentId = req.body.contentId
  // @ts-ignore
  const userId = req.userId

  ContentModel.deleteOne({
    _id: contentId,
    userId
  })
    .then(() => {
      res.json({
        message: 'Content deleted successfully'
      })
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({ message: 'Internal server error' })
    })
})

app.post('/api/v1/brain/share', userMiddleware, async (req, res) => {
  const { share } = req.body
  if (share) {
    // Check if a link already exists for the user.
    const existingLink = await LinkModel.findOne({
      // @ts-ignore
      userId: req.userId
    })
    if (existingLink) {
      res.json({ hash: existingLink.hash }) // Send existing hash if found.
      return
    }

    // Generate a new hash for the shareable link.
    const hash = random(10)
    await LinkModel.create({
      // @ts-ignore
      userId: req.userId,
      hash
    })
    res.json({ hash }) // Send new hash in the response.
  } else {
    // Remove the shareable link if share is false.
    await LinkModel.deleteOne({
      // @ts-ignore
      userId: req.userId
    })
    res.json({ message: 'Removed link' }) // Send success response.
  }
})

app.get('/api/v1/brain/:shareLink', async (req, res) => {
  const hash = req.params.shareLink

  const link = await LinkModel.findOne({
    hash
  })

  if (link) {
    const content = await ContentModel.find({
      userId: link.userId
    })

    const user = await UserModel.findOne({
      _id: link.userId
    })

    res.json({
      username: user?.username,
      content
    })
  } else {
    res.status(404).json({
      message: 'Link not found'
    })
  }
})

const PORT = 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
