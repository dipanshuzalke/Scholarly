import express from 'express'
import jwt from 'jsonwebtoken'
import { UserModel, ContentModel } from './db'
import { JWT_PASSWORD } from './config'
import { userMiddleware } from './middleware'

const app = express()
app.use(express.json())

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
    const tags = req.body.tags
    
    try {
        await ContentModel.create({
        title,
        link,
        tags,
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

app.get('/api/v1/content', userMiddleware, async (req, res) => {
    // @ts-ignore
    const userId = req.userId;
    const content = await ContentModel.find({
        userId
    }).populate("userId", "username")
    res.json({
        content
    })
})

app.delete('/api/v1/content', userMiddleware, (req, res) => {
    const contentId = req.body.contentId
    // @ts-ignore
    const userId = req.userId

    ContentModel.deleteOne({
        _id: contentId,
        userId
    }).then(() => {
        res.json({
            message: 'Content deleted successfully'
        })
    }).catch((err) => {
        console.error(err)
        res.status(500).json({ message: 'Internal server error' })
    })
})

app.post('/api/v1/brain/share', (req, res) => {})

app.get('/api/v1/brain/:shareLink', (req, res) => {})

const PORT = 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
