const Note = require("../models/note.model");

//CREATE Note
const createNote = async (req, res) => {
  const { title, content } = req.body;

  const newNote = new Note({
    title,
    content,
    user_id: req.user.id,
  });

  try {
    const savedNote = await newNote.save();
    res.status(200).json({
      message: "Note berhasil dibuat",
      data: savedNote,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET Note
const getNote = async (req, res) => {
  try {
    const notes = await Note.find({ user_id: req.user.id });
    res.status(200).json({ message: "Berhasil ambil data note", data: notes });
  } catch (error) {
    res.status(404).json({ message: "Data note tidak ditemukan" });
  }
};

// Get Note by ID
const getNoteById = async (req, res) => {
  try {
    const noteById = await Note.findById(req.params.id);
    res.status(200).json({
      message: "Berhasil ambil data note",
      data: noteById,
    });
  } catch (error) {
    res.status(404).json({ message: "Data note tidak ditemukan" });
  }
};

const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Berhasil hapus data note",
      data: deletedNote,
    });
  } catch (error) {
    res.status(404).json({ message: "Data note tidak ditemukan" });
  }
};

module.exports = { createNote, getNote, getNoteById, deleteNote };
