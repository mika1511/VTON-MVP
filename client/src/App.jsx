import { useState } from "react";
import TryOnCanvas from "./TryOnCanvas";
import "./index.css";

function App() {
  const [modelImage, setModelImage] = useState("");
  const [dressImage, setDressImage] = useState("");
  const [showCanvas, setShowCanvas] = useState(false);

  const uploadModel = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("http://localhost:5000/upload-model", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setModelImage(data.imageUrl);
    setShowCanvas(false);
  };

  const uploadDress = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("http://localhost:5000/upload-dress", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setDressImage(data.imageUrl);
    setShowCanvas(false);
  };

  const handleShowResult = () => {
    if (modelImage && dressImage) setShowCanvas(true);
  };

  return (
    <div className="app">
      <h1>VTON Project</h1>

      {/* ===== Uploads Section ===== */}
      <div className="upload-wrapper">
        {/* Model Upload */}
        <div className="upload-container">
          <p>Upload Your Photo</p>
          <label className="upload-btn">
            Choose Image
            <input
              type="file"
              accept="image/*"
              onChange={(e) => uploadModel(e.target.files[0])}
            />
          </label>
          {modelImage && <img src={modelImage} alt="Model Preview" className="preview-image" />}
        </div>

        {/* Dress Upload */}
        <div className="upload-container">
          <p>Upload Dress</p>
          <label className="upload-btn">
            Choose Image
            <input
              type="file"
              accept="image/*"
              onChange={(e) => uploadDress(e.target.files[0])}
            />
          </label>
          {dressImage && <img src={dressImage} alt="Dress Preview" className="preview-image" />}
        </div>
      </div>

      {/* ===== Show Result Button ===== */}
      {modelImage && dressImage && !showCanvas && (
        <button className="upload-btn" onClick={handleShowResult} style={{ marginTop: "20px" }}>
          Show Result
        </button>
      )}

      {/* ===== Canvas Section ===== */}
      {showCanvas && (
        <div className="canvas-section">
          <TryOnCanvas modelImage={modelImage} dressImage={dressImage} />
        </div>
      )}
    </div>
  );
}

export default App;
