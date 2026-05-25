const express = require("express")
const router = express.Router();
const Post = require("../model/post.model");
const multer = require("multer")
const uploadFile = require("../services/Storage.service")

const upload = multer({storage: multer.memoryStorage()})

  
router.post("/", upload.single("image"), async (req, res) => {

 const result = await uploadFile(req.file.buffer)

  const imageUrl = result.url
  const  caption = req.body.caption

  const content = `
      <h1>${caption}</h1>
      <img src="${imageUrl}" />
    `;


  const post = await Post.create({
    image: imageUrl,
    caption: caption,
    content: content,
    status: "draft",
    userId: req.user.id,
  });

  res.json(post);
});


router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({ status: "publish" }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching posts" });
  }
});


router.get("/user/me", async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching user posts" });
  }
});


router.get("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.json(post);
});


router.put("/:id", async (req, res) => {
  const { content, status } = req.body;

  const updated = await Post.findByIdAndUpdate(
    req.params.id,
    { content, status },
    { new: true }
  );

  res.json(updated);
});


router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    
    // Ensure ownership verification
    if (post.userId && post.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to delete this post" });
    }
    
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error deleting post" });
  }
});


module.exports = router;