const authToken = require("../middleware/authentication");
const express = require("express");
const {
  createNote,
  getNote,
  getNoteById,
  deleteNote,
} = require("../controllers/note.controller");
const router = express.Router();

router.post("/note", authToken, createNote);
router.get("/note", authToken, getNote);
router.get("/note/:id", authToken, getNoteById);
router.delete("/note/:id", authToken, deleteNote);

module.exports = router;
