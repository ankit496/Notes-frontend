'use client'

import React, { useContext, useEffect, useState } from "react";
import NoteContext from "../context/NoteContext";
import NoteCard from "./NoteCard";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import ThemeContext from "../context/ThemeContext";
import { FaMoon, FaSun } from 'react-icons/fa';
import { jwtDecode } from "jwt-decode";

export default function Tasks() {
    const router = useNavigate();
    const context = useContext(NoteContext);
    const { notes, getNotes, loading } = context;
    const [searchTerm, setSearchTerm] = useState("");
    const [username,setUsername]=useState();
    const { isDarkMode, toggleTheme } = useContext(ThemeContext); // Get the dark mode state and toggle function from ThemeContext
    console.log(notes);
    useEffect(() => {
        if (localStorage.getItem("token")) {
            const token = localStorage.getItem("token")
            const decoded = jwtDecode(token);
            setUsername(decoded.username);
            console.log(decoded)
            getNotes();
        } else {
            router("/login");
        }
    }, []);

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        router("/login");
    };

    const filteredNotes =
        Array.isArray(notes) &&
        notes.filter(
            (task) =>
                task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                task.description.toLowerCase().includes(searchTerm.toLowerCase())
        );

    return (
        <div className={`min-h-screen ${isDarkMode ? 'bg-black' : 'bg-white'} px-6 py-10`}>
            <div className="mx-auto max-w-7xl">
                {/* Header Section */}
                <div className={`flex flex-col sm:flex-row justify-between items-center mb-8 ${isDarkMode ? 'bg-gray-700' : 'bg-indigo-800'} p-6 rounded-lg shadow-md`}>
                    <h1 className="text-4xl font-bold text-white mb-4 sm:mb-0">Hi {username}!</h1>
                    <div className="relative w-full max-w-sm sm:w-auto">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search notes..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className={`w-full px-4 py-2 pl-10 rounded-lg 
                                    'text-gray-800' bg-gray-200  placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                            />
                            <FaSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-white' : 'text-gray-500'}`} />
                        </div>
                    </div>
                    <div className="flex space-x-4 mt-4 sm:mt-0">
                        <button
                            className="bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg px-5 py-2 shadow-lg transition-all duration-300 transform hover:scale-105"
                            onClick={() => router("/addnote")}
                        >
                            Add Note
                        </button>
                        <button
                            className="bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg px-5 py-2 shadow-lg transition-all duration-300 transform hover:scale-105"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                        <button
                            className="bg-gray-800 text-white font-medium rounded-lg px-5 py-2 shadow-lg transition-all duration-300 transform hover:scale-105"
                            onClick={toggleTheme}
                        >
                            {isDarkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-500" />}
                        </button>
                    </div>
                </div>

                {/* Notes Section */}
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
                    </div>
                ) : !filteredNotes.length ? (
                    <div className="text-center py-20">
                        <p className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-black'} mb-4`}>
                            {searchTerm ? "No matching notes found" : "No notes yet"}
                        </p>
                        <p className="text-lg text-gray-300">
                            {searchTerm
                                ? "Try a different search term."
                                : "Click 'Add Note' to create your first note!"}
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filteredNotes.map((note) => (
                            <NoteCard
                                key={note._id}
                                title={note.title}
                                description={note.description}
                                id={note._id}
                                date={note.updatedAt}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
