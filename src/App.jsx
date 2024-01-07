import './App.css'

import ImageUploadForm from './components/ImageUploadForm'
import APIOutput from './components/APIOutput'
import TextEvaluationCheckboxes from './components/TextEvaluationCheckboxes';

import { useState } from "react";

const App = () => {
  const [currentlyChecked, setCurrentlyChecked] = useState([])
  const [formattedJsonString, setFormattedJsonString] = useState(null);

  return (
    <div className="parent-container">
      <h1>Tweezer</h1>
      <h3>API for detecting hate speech, misinformation, and harmful content</h3>
      <ImageUploadForm currentlyChecked={currentlyChecked} setFormattedJsonString={setFormattedJsonString}/>
      <TextEvaluationCheckboxes currentlyChecked={currentlyChecked} setCurrentlyChecked={setCurrentlyChecked}/>
      <APIOutput formattedJsonString={formattedJsonString}/>
    </div>
  )
}

export default App

