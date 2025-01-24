import React, { useState } from "react";
import NoteContext from "./NoteContext";
const NoteState = (props) => {
  const initialTasks = []
  const [notes, setNotes] = useState(initialTasks)
  const [loading, setLoading] = useState(false);
  const getNotes = async () => {
    setLoading(true)
    const response = await fetch(`${import.meta.env.VITE_URL}/note/getNote`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json();
    setNotes(json)
    setLoading(false)
  }


  const addNote = async (title, description) => {
    //to api call
    setLoading(true)
    const response = await fetch(`${import.meta.env.VITE_URL}/note/addNote`, {
      method: "POST",
      headers: {
        "Content-type": "Application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title: title, description: description })
    });
    const note = await response.json()
    const newNote = {
      title: note.title,
      description: note.description,
      id: note._id,
      updatedAt: note.updatedAt
    }

    setNotes(notes.concat(newNote))
    setLoading(false)
  }

  const deleteNote = async (id) => {
    //API Call
    setLoading(true)
    await fetch(`${import.meta.env.VITE_URL}/note/deleteNote/${id}`, {
      method: "DELETE",
      headers: {
        "auth-token": localStorage.getItem('token')
      },
    });
    const newTask = notes.filter((task) => { return task._id !== id })
    setNotes(newTask)
    setLoading(false)
  }
  const fetchNote = async (id) => {
    const response = await fetch(`${import.meta.env.VITE_URL}/note/getById/${id}`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json();
    setNotes(json);
    setLoading(false);
    return json;
  }

  const updateNote = async (id, title, description, date, status) => {
    //API call
    await fetch(`${import.meta.env.VITE_URL}/note/updateNote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, date, status })
    });
    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description
      }
    }
    setNotes(newNotes)
  }

  return (
    <NoteContext.Provider value={{ loading, notes, addNote, deleteNote, updateNote, getNotes,fetchNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}
export default NoteState;