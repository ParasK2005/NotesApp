import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getnotes,
  createnote,
  deletenote,
  updateNote,
  importainote,
} from "../services/noteservice";
import NoteCard from "../components/NoteCard";
import Header from "../components/Header";
import NoteForm from "../components/NoteForm";
import EmptyState from "../components/EmptyState";
import "../styles/dashboard.css";

function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState(null);
  const [file, setFile] = useState(null);
  const [isQuestionPaper, setIsQuestionPaper] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await getnotes();
      console.log("Response:", response.data);
      setNotes(response.data.notes);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateNote = async () => {
    try {
      await createnote({
        title,
        content,
      });

      setTitle("");
      setContent("");

      fetchNotes();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletenote(id);
      fetchNotes();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditId(note._id);
  };

  const handleUpdate = async () => {
    try {
      await updateNote(editId, {
        title,
        content,
      });

      setEditId(null);
      setTitle("");
      setContent("");

      fetchNotes();
    } catch (error) {
      console.log(error);
    }
  };

  const handleImportAI = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("isquestionpaper", isQuestionPaper);

    setIsLoading(true);
    setLoadingMessage("uploading file...");

    let progressTimer;

    if (file.type.startsWith("video")) {
      progressTimer = setTimeout(() => {
        setLoadingMessage(
          "AI is transcribing & analyzing video (this can take 1-2 minutes for long videos)"
        );
      }, 4000);
    } else {
      progressTimer = setTimeout(() => {
        setLoadingMessage("AI is reading and solving document");
      }, 3000);
    }

    try {
      const response = await importainote(formData);
      clearTimeout(progressTimer);

      setTitle(response.data.title);
      setContent(response.data.content);

      setFile(null);
      setIsQuestionPaper(false);
    } catch (error) {
      clearTimeout(progressTimer);
      console.error(error);
      
      const status = error.response?.status;
      const message = error.response?.data?.message || "";
      if (status === 503 || message.includes("Service Unavailable") || message.includes("503")) {
        alert("The AI service is currently experiencing high demand. Please wait a moment and try again.");
      } else if (status === 429 || message.includes("Too Many Requests") || message.includes("429") || message.includes("Quota")) {
        alert("API rate limit or quota exceeded. Please try again in a few moments.");
      } else {
        alert(message || "failed to process file with Gemini AI");
      }
    } finally {
      setIsLoading(false);
      setLoadingMessage("");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="dashboard">
      <Header />

      <NoteForm
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        editId={editId}
        handleCreateNote={handleCreateNote}
        handleUpdate={handleUpdate}
        file={file}
        setFile={setFile}
        isQuestionPaper={isQuestionPaper}
        setIsQuestionPaper={setIsQuestionPaper}
        handleImportAI={handleImportAI}
        isLoading={isLoading}
        loadingMessage={loadingMessage}
      />

      <h1>My Notes</h1>

      {notes.length === 0 ? (
        <EmptyState />
      ) : (
        notes.map((note) => (
          <NoteCard
            key={note._id}
            note={note}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))
      )}

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;