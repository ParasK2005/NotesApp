import api from "./api";

export const getnotes = () => {
  return api.get("/notes", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const createnote = (data) => {
  return api.post("/notes", data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const updateNote = (id, data) => {
  return api.put(`/notes/${id}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const deletenote = (id) => {
  return api.delete(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const importainote = (formData) => {
  return api.post("/notes/import-ai", formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "multipart/form-data",
    }
  });
};