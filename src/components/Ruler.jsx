
import { useEffect, useRef } from "react";

export const HorizontalRuler = ({ 
  width, 
  mouseX, 
  showGuideline, 
  zoom = 1, 
  canvasOffset = { x: 0, y: 0 } 
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    
    // Set canvas size with device pixel ratio
    canvas.width = width * dpr;
    canvas.height = 30 * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = "30px";
    
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, 30);

    // Background
    ctx.fillStyle = "#f8f9fa";
    ctx.fillRect(0, 0, width, 30);

    // Border
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, 29.5);
    ctx.lineTo(width, 29.5);
    ctx.stroke();

    // Ruler marks and numbers
    ctx.fillStyle = "#6b7280";
    ctx.font = "10px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const step = 50 / zoom; // Adjust step based on zoom
    const minStep = Math.max(1, Math.floor(step));

    for (let i = 0; i <= width; i += minStep) {
      const x = i;
      const isMajor = i % (minStep * 2) === 0;
      
      ctx.strokeStyle = "#9ca3af";
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      
      if (isMajor) {
        ctx.moveTo(x, 15);
        ctx.lineTo(x, 30);
        
        // Add numbers for major marks
        if (i % (minStep * 4) === 0) {
          ctx.fillText(Math.round(i), x, 10);
        }
      } else {
        ctx.moveTo(x, 20);
        ctx.lineTo(x, 30);
      }
      ctx.stroke();
    }

    // Mouse guideline
    if (showGuideline && mouseX !== null && mouseX >= 0 && mouseX <= width) {
      ctx.strokeStyle = "#ef4444";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(mouseX, 0);
      ctx.lineTo(mouseX, 30);
      ctx.stroke();
    }
  }, [width, mouseX, showGuideline, zoom, canvasOffset]);

  return (
    <canvas
      ref={canvasRef}
      className="border-r border-border bg-background"
      style={{ display: "block" }}
    />
  );
};

export const VerticalRuler = ({ 
  height, 
  mouseY, 
  showGuideline, 
  zoom = 1, 
  canvasOffset = { x: 0, y: 0 } 
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    
    canvas.width = 30 * dpr;
    canvas.height = height * dpr;
    canvas.style.width = "30px";
    canvas.style.height = `${height}px`;
    
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, 30, height);

    // Background
    ctx.fillStyle = "#f8f9fa";
    ctx.fillRect(0, 0, 30, height);

    // Border
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(29.5, 0);
    ctx.lineTo(29.5, height);
    ctx.stroke();

    // Ruler marks and numbers
    ctx.fillStyle = "#6b7280";
    ctx.font = "10px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const step = 50 / zoom;
    const minStep = Math.max(1, Math.floor(step));

    for (let i = 0; i <= height; i += minStep) {
      const y = i;
      const isMajor = i % (minStep * 2) === 0;
      
      ctx.strokeStyle = "#9ca3af";
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      
      if (isMajor) {
        ctx.moveTo(15, y);
        ctx.lineTo(30, y);
        
        if (i % (minStep * 4) === 0) {
          ctx.save();
          ctx.translate(10, y);
          ctx.rotate(-Math.PI / 2);
          ctx.fillText(Math.round(i), 0, 0);
          ctx.restore();
        }
      } else {
        ctx.moveTo(20, y);
        ctx.lineTo(30, y);
      }
      ctx.stroke();
    }

    // Mouse guideline
    if (showGuideline && mouseY !== null && mouseY >= 0 && mouseY <= height) {
      ctx.strokeStyle = "#ef4444";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, mouseY);
      ctx.lineTo(30, mouseY);
      ctx.stroke();
    }
  }, [height, mouseY, showGuideline, zoom, canvasOffset]);

  return (
    <canvas
      ref={canvasRef}
      className="border-b border-border bg-background"
      style={{ display: "block" }}
    />
  );
};
