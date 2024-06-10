const validate = require("../middleware/validate");

const express = require("express");
const {
  createNote,
  getNote,
  getNoteById,
  deleteNote,
} = require("../controllers/note.controller");
const router = express.Router();

router.post("/note", validate, createNote);
router.get("/note", validate, getNote);
router.get("/note/:id", validate, getNoteById);
router.delete("/note/:id", validate, deleteNote);

module.exports = router;
