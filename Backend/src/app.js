const express = require("express")
const connectDB = require("./db/db")
const cors = require("cors")
const Post = require("./model/post.model");
const CreatepostRoute = require("./Controller/CreatePost.controller")
const authRouter = require("./Controller/auth.controller")
const authMiddleware = require("./middleware/auth.middleware")



const app = express()
connectDB()
app.use(cors())

app.use(express.json())

app.use("/auth", authRouter)
app.use("/posts", authMiddleware, CreatepostRoute)


module.exports = app