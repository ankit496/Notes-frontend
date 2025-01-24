import './App.css'
import Login from './components/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './components/Signup'
import Notes from "./components/Notes"
import NoteState from './context/NoteState'
import AddNote from './components/AddNote'
import ThemeState from './context/ThemeState'
import NoteUpdate from './components/NoteUpdate'
function App() {


  return (
    <>
      <ThemeState>
        <NoteState>
          <BrowserRouter>
            <Routes>
              <Route path="/addnote" element={<AddNote></AddNote>}></Route>
              <Route path="/" element={<Notes></Notes>}></Route>
              <Route path="/editnote/:id" element={<NoteUpdate />}></Route>
              <Route path="/login" element={<Login></Login>}></Route>
              <Route path="/signup" element={<Signup></Signup>}></Route>
            </Routes>
          </BrowserRouter>
        </NoteState>
      </ThemeState>
    </>
  )
}

export default App
