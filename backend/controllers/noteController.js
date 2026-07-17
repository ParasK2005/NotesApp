const Note = require("../models/Note");
const path = require("path");
const fs = require("fs");
const { uploadAndProcessFile, generateNotesFromFile } = require("../services/geminiservices");

const createnote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "title content required",
      });
    }

    const note = await Note.create({
      title,
      content,
      userId: req.user.id,
    });

    res.status(201).json({
      message: "note created successfully",
      note,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getnote = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id });

    res.status(200).json({
      message: "Notes fetched successfully",
      notes,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updatenote = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findOne({
      _id: id,
      userId: req.user.id,
    });

    if (!note) {
      return res.status(404).json({
        message: "note not found or not authorized",
      });
    }

    const updatedNote = await Note.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({
      message: "Note updated successfully",
      updatedNote,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deletenote = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findOne({
      _id: id,
      userId: req.user.id,
    });

    if (!note) {
      return res.status(404).json({
        message: "Note not found or not authorized",
      });
    }

    await Note.findByIdAndDelete(id);

    res.status(200).json({
      message: "Note deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const importaintonote = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "no file uploaded" });
    }

    const filepath = req.file.path;
    const mimetype = req.file.mimetype;
    const displayname = req.file.originalname;
    const isquestionpaper = req.body.isquestionpaper === "true";

    const geminifile = await uploadAndProcessFile(filepath, mimetype, displayname);

    const generatedcontent = await generateNotesFromFile(geminifile, mimetype, isquestionpaper);

    fs.unlink(filepath, (err) => {
      if (err) console.error("Error deleting local file:", err);
      else console.log(`Deleted local temp file: ${filepath}`);
    });

    const drafttitle = path.parse(displayname).name + " (AI Notes)";
    
    res.status(200).json({
      title: drafttitle,
      content: generatedcontent,
    });

  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    console.error("AI Import Error:", error);
    
    let statusCode = 500;
    let message = error.message || "Failed to process file with Gemini AI";
    
    if (error.message && (error.message.includes("Service Unavailable") || error.message.includes("503"))) {
      statusCode = 503;
      message = "The AI service is currently experiencing high demand. Please wait a moment and try again.";
    } else if (error.message && (error.message.includes("Too Many Requests") || error.message.includes("429") || error.message.includes("Quota"))) {
      statusCode = 429;
      message = "API rate limit or quota exceeded. Please try again in a few moments.";
    }
    
    res.status(statusCode).json({ message });
  }
};

module.exports = {
  createnote,
  getnote,
  updatenote,
  deletenote,
  importaintonote,
};
