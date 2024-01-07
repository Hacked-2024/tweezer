import './App.css'

import ImageUploadForm from './components/ImageUploadForm'
import APIOutput from './components/APIOutput'
import { useState } from "react";

const App = () => {
  const [outputText, setOutputText] = useState("");
  return (
    <div className="parent-container">
      <h1>Tweezer</h1>
      <h3>API for detecting hate speech, misinformation, and harmful content</h3>
      <ImageUploadForm setOutputText={setOutputText}/>
      <APIOutput outputText={outputText}/>
    </div>
  )
}

export default App

