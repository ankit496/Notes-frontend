import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import NoteContext from "../context/NoteContext";
import ThemeContext from "../context/ThemeContext";

export default function NoteCard({ id, title, description, searchTerm = "" }) {
  const router = useNavigate();
  const noteContext = useContext(NoteContext);
  const { deleteNote } = noteContext;

  const { isDarkMode } = useContext(ThemeContext); // Access dark mode state

  const handleEdit = () => router(`/editNote/${id}`);
  const handleDelete = () => deleteNote(id);

  const highlightText = (text, highlight) => {
    if (!highlight.trim()) return <span>{text}</span>;
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={i} className="bg-yellow-200 text-gray-800">{part}</span>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
      } rounded-lg shadow-lg flex flex-col h-full transform transition-all duration-300 hover:scale-105`}
    >
      <div className="p-6 flex-1">
        <h3 className="text-xl font-semibold mb-2">{highlightText(title, searchTerm)}</h3>
        <p
          className="mb-4 overflow-y-auto"
          style={{ maxHeight: "6rem" }}
        >
          {highlightText(description, searchTerm)}
        </p>
      </div>
      <div className="px-6 py-4 flex justify-between items-center">
        <button
          onClick={handleEdit}
          className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg px-4 py-2 transition-colors duration-300"
        >
          <FiEdit className="text-xl" />
        </button>
        <button
          onClick={handleDelete}
          className="flex items-center bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg px-4 py-2 transition-colors duration-300"
        >
          <FiTrash2 className="text-xl" />
        </button>
      </div>
    </div>
  );
}
