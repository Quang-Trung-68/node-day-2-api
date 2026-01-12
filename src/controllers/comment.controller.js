const CommentModel = require("@/models/comment.model");

function createComment(req, res) {
  const { postId, content } = req.body;

  if (!postId || !content) {
    return res.status(400).json({
      success: false,
      message: "Post id and content are required",
    });
  }

  const newComment = CommentModel.create({
    postId,
    content,
  });

  return res.status(201).json({
    success: true,
    data: newComment,
  });
}

function getComment(req, res) {
  const id = req.params.id;

  const commentData = CommentModel.getOne(id);

  if (commentData == "{}")
    return res.status(404).json({
      success: false,
      message: "Comment is not found",
    });

  return res.status(200).json({
    success: true,
    data: commentData,
  });
}

function getAllComment(req, res) {
  const commentData = CommentModel.getAll();

  return res.status(200).json({
    success: true,
    data: commentData,
  });
}

function updateComment(req, res) {
  const { postId, content } = req.body;
  const id = req.params.id;

  if (!postId || !content) {
    return res.status(400).json({
      success: false,
      message: "Post id and content are required",
    });
  }

  const newComment = CommentModel.update(id, {
    postId,
    content,
  });

  if (newComment == "{}")
    return res.status(404).json({
      success: false,
      message: "Comment is not found",
    });

  return res.status(200).json({
    success: true,
    data: newComment,
  });
}

function destroyComment(req, res) {
  const id = req.params.id;

  const commentData = CommentModel.destroy(id);

  if (commentData == "{}")
    return res.status(404).json({
      success: false,
      message: "Comment is not found",
    });

  return res.status(204).json({
    success: true,
    data: commentData,
  });
}

module.exports = {
  getComment,
  getAllComment,
  createComment,
  updateComment,
  destroyComment,
};
