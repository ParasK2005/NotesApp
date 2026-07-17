import "../styles/noteform.css";

function NoteForm({
  title,
  setTitle,
  editId,
  content,
  setContent,
  handleCreateNote,
  handleUpdate,
  file,
  setFile,
  isQuestionPaper,
  setIsQuestionPaper,
  isLoading,
  loadingMessage,
  handleImportAI,
}) {
  return (
    <div className="note-form-card">
      <h2>Create New Note</h2>

      <div className="ai-import-container">
        <label className="ai-import-title">Import from Video or PDF (Gemini AI)</label>
        
        <div className="ai-file-row">
          <input
            type="file"
            accept=".pdf,video/*"
            id="ai-file-input"
            onChange={(e) => setFile(e.target.files[0])}
            disabled={isLoading}
          />
          
          {file && file.type === "application/pdf" && (
            <div className="ai-checkbox-wrapper">
              <input
                type="checkbox"
                id="isQuestionPaper"
                checked={isQuestionPaper}
                onChange={(e) => setIsQuestionPaper(e.target.checked)}
                disabled={isLoading}
              />
              <label htmlFor="isQuestionPaper">Question Paper? (Solve it)</label>
            </div>
          )}
        </div>

        {file && (
          <button
            type="button"
            className="ai-extract-btn"
            onClick={handleImportAI}
            disabled={isLoading}
          >
            {isLoading ? loadingMessage : `Analyze "${file.name}"`}
          </button>
        )}
      </div>

      <div className="divider-container">
        <span className="divider-text">OR WRITE MANUALLY</span>
      </div>


      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          placeholder="Enter note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="form-group">
        <label>Content</label>
        <textarea
          placeholder="Write your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="6"
          disabled={isLoading}
        />
      </div>

      <button
        onClick={editId ? handleUpdate : handleCreateNote}
        disabled={isLoading}
      >
        {editId ? "Update Note" : "Create Note"}
      </button>
    </div>
  );
}

export default NoteForm;