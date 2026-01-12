const express = require("express");
const router = express.Router();

const commentController = require("@/controllers/comment.controller");

router.get("/", commentController.getAllComment);
router.get("/:id", commentController.getComment);
router.post("/", commentController.createComment);
router.put("/:id", commentController.updateComment);
router.delete("/:id", commentController.destroyComment);

module.exports = router;
