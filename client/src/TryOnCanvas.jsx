import { useEffect, useRef, useState } from "react";

function TryOnCanvas({ modelImage, dressImage }) {
  const canvasRef = useRef(null);
  const [dressPos, setDressPos] = useState({ x: 80, y: 140 });
  const [dragging, setDragging] = useState(false);
  const [w, setW] = useState(180);
  const [h, setH] = useState(220);
  const [loaded, setLoaded] = useState({ model: false, dress: false });

  const modelRef = useRef(new Image());
  const dressRef = useRef(new Image());

  // Load images
  useEffect(() => {
    const model = new Image();
    const dress = new Image();

    model.src = modelImage;
    dress.src = dressImage;

    model.onload = () => setLoaded((prev) => ({ ...prev, model: true }));
    dress.onload = () => setLoaded((prev) => ({ ...prev, dress: true }));

    modelRef.current = model;
    dressRef.current = dress;
  }, [modelImage, dressImage]);

  // Draw canvas
  useEffect(() => {
    if (!loaded.model || !loaded.dress) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const CANVAS_WIDTH = 350;
    const CANVAS_HEIGHT = 600;

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(modelRef.current, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(dressRef.current, dressPos.x, dressPos.y, w, h);
  }, [dressPos, w, h, loaded]);

  // Drag logic
  const startDrag = () => setDragging(true);
  const stopDrag = () => setDragging(false);
  const onMove = (e) => {
    if (!dragging) return;
    const rect = canvasRef.current.getBoundingClientRect();
    setDressPos({
      x: e.clientX - rect.left - w / 2,
      y: e.clientY - rect.top - h / 2,
    });
  };

  return (
    <div className="canvas-wrapper">
      <canvas
        ref={canvasRef}
        width={350}
        height={600}
        style={{ border: "2px solid #ddd", borderRadius: "12px", cursor: "grab", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}
        onMouseMove={onMove}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
        onMouseDown={startDrag}
      />

      <div className="slider-section">
        <label>Width: {w}px</label>
        <input type="range" min="50" max="1000" value={w} onChange={(e) => setW(Number(e.target.value))} />

        <label>Height: {h}px</label>
        <input type="range" min="50" max="1000" value={h} onChange={(e) => setH(Number(e.target.value))} />
      </div>
    </div>
  );
}

export default TryOnCanvas;
