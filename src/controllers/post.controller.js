const PostModel = require("@/models/post.model");

function createPost(req, res) {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      success: false,
      message: "Title and content are required",
    });
  }

  const newPost = PostModel.create({
    title,
    content,
  });

  return res.status(201).json({
    success: true,
    data: newPost,
  });
}

function getPost(req, res) {
  const id = req.params.id;

  const postData = PostModel.getOne(id);

  if (!postData)
    return res.status(404).json({
      success: false,
      message: "Post is not found",
    });

  return res.status(200).json({
    success: true,
    data: postData,
  });
}

function getAllPost(req, res) {
  const postData = PostModel.getAll();

  return res.status(200).json({
    success: true,
    data: postData,
  });
}

function updatePost(req, res) {
  const { title, content } = req.body;
  const id = req.params.id;

  if (!title || !content) {
    return res.status(400).json({
      success: false,
      message: "Title and content are required",
    });
  }

  const newPost = PostModel.update(id, {
    title,
    content,
  });

  if (!newPost)
    return res.status(404).json({
      success: false,
      message: "Post is not found",
    });

  return res.status(200).json({
    success: true,
    data: newPost,
  });
}

function destroyPost(req, res) {
  const id = req.params.id;

  const postData = PostModel.destroy(id);

  if (!postData)
    return res.status(404).json({
      success: false,
      message: "Post is not found",
    });

  return res.status(204).json({
    success: true,
    data: postData,
  });
}

module.exports = { getPost, getAllPost, createPost, updatePost, destroyPost };
