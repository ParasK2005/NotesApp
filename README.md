# 📝 NotesApp (with Gemini AI Integration)

<div align="center">

  <p align="center">
    <strong>A sleek, local-first note-taking dashboard with real-time Markdown rendering, priority pinning, and instant search—powered by the Gemini AI API.</strong>
  </p>

  <h4>
    <a href="#-overview">Overview</a> •
    <a href="#-ai-features">AI Features</a> •
    <a href="#-key-features">Key Features</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-quick-start">Quick Start</a> •
    <a href="#-productivity-shortcuts">Shortcuts</a> •
    <a href="#-theme-customization">Theme Customization</a> •
    <a href="#-contributing">Contributing</a>
  </h4>

</div>

<hr />

## 🌟 Overview

**NotesApp** is a high-performance, developer-centric note-taking app designed to run entirely in the browser. It combines the simplicity of Markdown with the speed of local-first data persistence. With zero external dependencies, no server lag, and an instant-on search index, it is the ultimate companion for capturing code snippets, tasks, and ideas on the fly. 

Now, with **Gemini AI API** integration, NotesApp acts as your intelligent co-writer, transforming raw thoughts into polished, organized notes instantly.

> [!TIP]
> **Why Local-First & AI?** Your notes are stored securely inside your browser's local storage for 100% privacy and offline speed, while AI processing is triggered on-demand using your Gemini API key.

---

## 🤖 Gemini AI Features

Transform your raw text into structured intelligence with built-in AI utilities:

* ✨ **AI Summarization** — Instantly generate concise executive summaries of long articles, meeting minutes, or journals.
* 🏷️ **Smart Tag Generation** — Let Gemini analyze your note's context and auto-generate relevant category tags.
* 📋 **Action Item Extraction** — Automatically extract checklists, deadlines, and actionable tasks from your notes.
* ✍️ **Tone & Style Refiner** — Polish draft text to be professional, academic, or casual with a single click.
* 🧠 **Smart Q&A / Explain** — Select any portion of code or complex text inside your note and ask Gemini to explain it.

---

## ⚡ Key Features

| Feature | Description | Icon |
| :--- | :--- | :---: |
| **Real-time Dual-Pane Markdown** | Write note content in Markdown and watch it render instantly side-by-side. | ✍️ |
| **Priority Pinning** | Pin critical items, to-do lists, or daily logs to keep them anchored at the top. | 📌 |
| **Fuzzy-Search Index** | Instantly scan titles, tags, and content with real-time feedback. | 🔍 |
| **Dynamic Tag Taxonomies** | Label notes with fluid, color-coded tag pills for quick categorization. | 🏷️ |
| **Auto-Save & Storage** | Every keypress is synced locally. Never lose a word of your notes again. | 💾 |
| **Universal Exports** | Export single notes or bulk backups as `.md`, `.txt`, or `.json` formats. | 📤 |
| **Adaptive Glassmorphism** | Exquisite dark and light modes styled to blend naturally with your system. | 🎨 |

---

## 🛠️ Tech Stack

We believe in keeping things fast and minimal. NotesApp is crafted with zero bloating frameworks:

- **HTML5 & CSS3**: For structural markup and responsive grid-based layouts utilizing smooth transition variables.
- **Pure JavaScript (ES6+)**: Handles the state management, Markdown parsing engine, search algorithms, and offline synchronization.
- **Gemini AI SDK / Native API**: Integrates Google's Gemini models for on-demand intelligence.
- **FontAwesome Vector Library**: Renders crisp iconography across the control panel.

```mermaid
graph TD
    A[Browser View / DOM] -->|User Input| B(State Controller)
    B -->|Persist Data| C[(Local Storage)]
    B -->|Compile Markdown| D[Markdown Render Engine]
    D -->|Update View| A
    B -->|Filter Content| E[Fuzzy Search Engine]
    E -->|Refiltered Cards| A
    B -->|Request AI Insight| F[Gemini AI API]
    F -->|Return Summary / Tags| B
