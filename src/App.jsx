import './App.css'

import ImageUploadForm from './components/ImageUploadForm'
import APIOutput from './components/APIOutput'
import { useState } from "react";

const App = () => {
  const [outputText, setOutputText] = useState("");
  const [formattedJsonString, setFormattedJsonString] = useState(null);
  return (
    <div className="parent-container">
      <h1>Tweezer</h1>
      <h3>API for detecting hate speech, misinformation, and harmful content</h3>
      <ImageUploadForm setOutputText={setOutputText} setFormattedJsonString={setFormattedJsonString}/>
      <APIOutput outputText={outputText} formattedJsonString={formattedJsonString}/>
    </div>
  )
}

export default App

