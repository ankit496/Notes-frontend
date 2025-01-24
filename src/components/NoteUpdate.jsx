import React, { useContext, useEffect, useState } from 'react';
import NoteContext from '../context/NoteContext';
import ThemeContext from '../context/ThemeContext';
import { useNavigate, useParams } from 'react-router-dom';
import { Circles } from 'react-loader-spinner';

const NoteUpdate = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const context = useContext(NoteContext);
    const { fetchNote, updateNote } = context;
    const { isDarkMode } = useContext(ThemeContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNoteDetails = async () => {
            setLoading(true);
            const note = await fetchNote(id);
            setTitle(note.title);
            setDescription(note.description);
            setLoading(false);
        };
        fetchNoteDetails();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        await updateNote(id, title, description);
        setLoading(false);
        navigate('/');
    };

    return (
        <div
            className={`w-full h-screen flex items-center justify-center ${
                isDarkMode
                    ? 'bg-gradient-to-r from-gray-800 via-gray-900 to-black'
                    : 'bg-gradient-to-r from-blue-600 to-black'
            }`}
        >
            {loading ? (
                <Circles
                    height="80"
                    width="80"
                    color={isDarkMode ? '#4fa94d' : '#ffffff'}
                    ariaLabel="circles-loading"
                    visible={true}
                />
            ) : (
                <form
                    onSubmit={handleSubmit}
                    className={`max-w-lg w-full p-6 rounded-lg shadow-lg ${
                        isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
                    }`}
                >
                    <h2 className="text-2xl font-bold text-center mb-6">
                        {isDarkMode ? 'Edit Task' : 'Edit Task'}
                    </h2>

                    {/* Title Input */}
                    <div className="mb-4">
                        <label
                            className={`block font-semibold mb-2 ${
                                isDarkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}
                        >
                            Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                                isDarkMode
                                    ? 'bg-gray-700 text-white placeholder-gray-400'
                                    : 'bg-gray-100 text-gray-800'
                            }`}
                            placeholder="Enter task title"
                            required
                        />
                    </div>

                    {/* Description Input */}
                    <div className="mb-6">
                        <label
                            className={`block font-semibold mb-2 ${
                                isDarkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}
                        >
                            Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                                isDarkMode
                                    ? 'bg-gray-700 text-white placeholder-gray-400'
                                    : 'bg-gray-100 text-gray-800'
                            }`}
                            placeholder="Enter task description"
                            rows="4"
                            required
                        ></textarea>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between">
                        <button
                            type="submit"
                            className={`py-2 px-4 rounded-lg transition-all ${
                                isDarkMode
                                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                            }`}
                        >
                            Save Changes
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className={`py-2 px-4 rounded-lg transition-all ${
                                isDarkMode
                                    ? 'bg-gray-600 hover:bg-gray-700 text-white'
                                    : 'bg-gray-500 hover:bg-gray-600 text-white'
                            }`}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default NoteUpdate;
