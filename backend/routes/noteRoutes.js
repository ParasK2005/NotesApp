const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const authmiddleware = require("../middleware/authMiddleware");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({
    storage,
    limits: {
        fileSize: 100 * 1024 * 1024,
    },
});

const {
    createnote,
    getnote,
    updatenote,
    deletenote,
    importaintonote,
} = require("../controllers/noteController");

router.post("/", authmiddleware, createnote);
router.get("/", authmiddleware, getnote);
router.put("/:id", authmiddleware, updatenote);
router.delete("/:id", authmiddleware, deletenote);

router.post(
    "/import-ai",
    authmiddleware,
    upload.single("file"),
    importaintonote
);

module.exports = router;