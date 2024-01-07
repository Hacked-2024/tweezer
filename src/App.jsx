import { useState } from 'react'
import './App.css'

// function App() {
//   // const [count, setCount] = useState(0)

//   const [file, setFile] = useState();
//   function handleChange(e) {
//     console.log(e.target.files);
//     setFile(URL.createObjectURL(e.target.files[0]));
//   }

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Tweezer</h1>
//       <div className="card">
//         {/* <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button> */}
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>

//       <form>
//         <label>
//           <h3>Input text or upload image</h3>
//           <input type="text" name="name" />
//         </label>
//         <input type="submit" value="Submit" />
//       </form>

//       {/* <div className="App">
//         <h2>Add Image:</h2>
//         <input type="file" onChange={handleChange} />
//         <img src={file} />
//       </div> */}
//       {/* Image Input */}
//       <div className="container">
//         <div className="card">
//           <h3>Upload Files</h3>
//           <div className="drop_box">
//             <header>
//               <h4>Select File here</h4>
//             </header>
//             <p>Files Supported: jpg, TEXT, DOC , DOCX</p>
//             <input type="file" hidden accept=".doc,.docx,.jpg" id="fileID" style={{ display: 'none' }}/>
//               <button className="btn" onClick={() => document.getElementById('fileID').click()}>Choose File</button>
//           </div>

//         </div>
//       </div>
//     </>
//   )
// }

// export default App

const ImageUploadForm = () => {
  const [textValue, setTextValue] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  const handleTextChange = (e) => {
    setTextValue(e.target.value);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const resizedFile = await resizeImage(file); // Resize the selected image
    setImageFile(resizedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setDragOver(false);

    const file = e.dataTransfer.files[0];
    const resizedFile = await resizeImage(file); // Resize the dropped image
    setImageFile(resizedFile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Text Input:', textValue);
    console.log('Image File:', imageFile);
    // Handle form submission logic here (e.g., sending data to the server)
  };

  const resizeImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;

        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxWidth = 300; // Set your desired maximum width
          const maxHeight = 300; // Set your desired maximum height
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob((blob) => {
            const resizedFile = new File([blob], file.name, {
              type: 'image/jpeg', // Set your desired image type (jpeg, png, etc.)
              lastModified: Date.now(),
            });
            resolve(resizedFile);
          }, 'image/jpeg');
        };
      };
    });
  };

  return (
    <div className="parent-container">
    <form onSubmit={handleSubmit}>
      <h1>Tweezer</h1>
      <h3>API for detecting hate speech, misinformation, and harmful content</h3>
      <br/>
      <div className="text-input-container">
        <label htmlFor="text-input">Text Input: </label><br/>
        <input
          type="text"
          id="text-input"
          className="text-input"
          value={textValue}
          onChange={handleTextChange}
          placeholder="Enter text here"
        />
      </div>
      <br/>
      <div
        className={dragOver ? 'image-upload drop-area' : 'image-upload'}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <label htmlFor="image-upload" className="upload-label">
          {imageFile ? (
            <img
              src={URL.createObjectURL(imageFile)}
              alt="Uploaded"
              className="uploaded-image"
            />
          ) : (
            <span>Drag & Drop or Click to Upload Image</span>
          )}
        </label>
        <input
          type="file"
          id="image-upload"
          accept=".jpg, .jpeg, .png"
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
      </div>
      <button type="submit" className="submit-button">Submit</button>
    </form>
    </div>
  );
};

export default ImageUploadForm;