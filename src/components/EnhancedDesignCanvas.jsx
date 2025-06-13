
import { useEffect, useRef, useState, useCallback } from "react";
import { Canvas as FabricCanvas, Rect, Circle, Textbox } from "fabric";
import { HorizontalRuler, VerticalRuler } from "./Ruler";
import { FrameSelector } from "./FrameSelector";

export const EnhancedDesignCanvas = ({ activeTool, onObjectSelect }) => {
  const canvasRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const [fabricCanvas, setFabricCanvas] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });
  const [showGuidelines, setShowGuidelines] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 1200, height: 800 });
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [frameObject, setFrameObject] = useState(null);
  const [zoom, setZoom] = useState(1);

  // Initialize Fabric canvas
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: canvasSize.width,
      height: canvasSize.height,
      backgroundColor: "#ffffff",
    });

    // Add grid pattern using CSS background instead of fabric pattern
    canvasRef.current.style.backgroundImage = `
      linear-gradient(rgba(240, 240, 240, 0.5) 1px, transparent 1px),
      linear-gradient(90deg, rgba(240, 240, 240, 0.5) 1px, transparent 1px)
    `;
    canvasRef.current.style.backgroundSize = "20px 20px";

    // Canvas event listeners
    canvas.on("selection:created", (e) => {
      onObjectSelect(e.selected?.[0]);
    });

    canvas.on("selection:updated", (e) => {
      onObjectSelect(e.selected?.[0]);
    });

    canvas.on("selection:cleared", () => {
      onObjectSelect(null);
    });

    canvas.on("mouse:move", (e) => {
      const pointer = canvas.getPointer(e.e);
      setMousePosition({ x: Math.round(pointer.x), y: Math.round(pointer.y) });
      setShowGuidelines(true);
    });

    canvas.on("mouse:out", () => {
      setShowGuidelines(false);
      setMousePosition({ x: null, y: null });
    });

    setFabricCanvas(canvas);

    return () => {
      canvas.dispose();
    };
  }, [canvasSize, onObjectSelect]);

  // Handle tool actions
  useEffect(() => {
    if (!fabricCanvas) return;

    const handleClick = (e) => {
      const pointer = fabricCanvas.getPointer(e.e);
      
      if (activeTool === "rectangle") {
        const rect = new Rect({
          left: pointer.x - 50,
          top: pointer.y - 25,
          width: 100,
          height: 50,
          fill: "#3b82f6",
          stroke: "#1e40af",
          strokeWidth: 1,
        });
        fabricCanvas.add(rect);
        fabricCanvas.setActiveObject(rect);
      } else if (activeTool === "circle") {
        const circle = new Circle({
          left: pointer.x - 25,
          top: pointer.y - 25,
          radius: 25,
          fill: "#10b981",
          stroke: "#059669",
          strokeWidth: 1,
        });
        fabricCanvas.add(circle);
        fabricCanvas.setActiveObject(circle);
      } else if (activeTool === "text") {
        const text = new Textbox("Enter text", {
          left: pointer.x,
          top: pointer.y,
          fontSize: 16,
          fill: "#000000",
          fontFamily: "Arial",
        });
        fabricCanvas.add(text);
        fabricCanvas.setActiveObject(text);
        text.enterEditing();
      }
    };

    if (activeTool !== "select") {
      fabricCanvas.on("mouse:down", handleClick);
    }

    return () => {
      fabricCanvas.off("mouse:down", handleClick);
    };
  }, [activeTool, fabricCanvas]);

  // Handle frame selection
  const handleFrameSelect = useCallback((frame) => {
    if (!fabricCanvas) return;

    // Remove existing frame
    if (frameObject) {
      fabricCanvas.remove(frameObject);
    }

    // Create new frame
    const newFrame = new Rect({
      left: (canvasSize.width - frame.width) / 2,
      top: (canvasSize.height - frame.height) / 2,
      width: frame.width,
      height: frame.height,
      fill: "transparent",
      stroke: "#000000",
      strokeWidth: 2,
      selectable: true,
      evented: true,
      strokeDashArray: [5, 5],
    });

    // Add frame label
    const label = new Textbox(`${frame.name} - ${frame.width}×${frame.height}`, {
      left: newFrame.left,
      top: newFrame.top - 25,
      fontSize: 12,
      fill: "#000000",
      fontFamily: "Arial",
      selectable: false,
      evented: false,
    });

    fabricCanvas.add(newFrame);
    fabricCanvas.add(label);
    fabricCanvas.renderAll();

    setFrameObject(newFrame);
    setSelectedFrame(frame);
  }, [fabricCanvas, canvasSize, frameObject]);

  // Zoom controls
  const handleZoomIn = () => {
    const newZoom = Math.min(zoom * 1.2, 3);
    setZoom(newZoom);
    if (fabricCanvas) {
      fabricCanvas.setZoom(newZoom);
      fabricCanvas.renderAll();
    }
  };

  const handleZoomOut = () => {
    const newZoom = Math.max(zoom / 1.2, 0.1);
    setZoom(newZoom);
    if (fabricCanvas) {
      fabricCanvas.setZoom(newZoom);
      fabricCanvas.renderAll();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Frame Selector */}
      <FrameSelector 
        onFrameSelect={handleFrameSelect} 
        selectedFrame={selectedFrame} 
      />

      {/* Canvas Area with Rulers */}
      <div className="flex flex-1 overflow-hidden">
        {/* Corner and Vertical Ruler */}
        <div className="flex flex-col">
          {/* Corner square */}
          <div className="w-[30px] h-[30px] bg-background border-r border-b border-border flex items-center justify-center">
            <div className="w-2 h-2 bg-muted rounded-full"></div>
          </div>
          
          {/* Vertical Ruler */}
          <VerticalRuler
            height={canvasSize.height}
            mouseY={mousePosition.y}
            showGuideline={showGuidelines}
            zoom={zoom}
          />
        </div>

        {/* Main Canvas Area */}
        <div className="flex flex-col flex-1">
          {/* Horizontal Ruler */}
          <HorizontalRuler
            width={canvasSize.width}
            mouseX={mousePosition.x}
            showGuideline={showGuidelines}
            zoom={zoom}
          />

          {/* Canvas Container */}
          <div 
            ref={canvasContainerRef}
            className="flex-1 overflow-auto relative bg-muted/30"
          >
            {/* Zoom Controls */}
            <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2">
              <button
                onClick={handleZoomIn}
                className="w-8 h-8 bg-background border border-border rounded flex items-center justify-center hover:bg-muted"
              >
                +
              </button>
              <div className="w-8 h-8 bg-background border border-border rounded flex items-center justify-center text-xs">
                {Math.round(zoom * 100)}%
              </div>
              <button
                onClick={handleZoomOut}
                className="w-8 h-8 bg-background border border-border rounded flex items-center justify-center hover:bg-muted"
              >
                -
              </button>
            </div>

            {/* Mouse Coordinates Display */}
            {showGuidelines && mousePosition.x !== null && mousePosition.y !== null && (
              <div 
                className="absolute bg-background border border-border rounded px-2 py-1 text-xs pointer-events-none z-20"
                style={{
                  left: mousePosition.x + 40,
                  top: mousePosition.y + 40,
                }}
              >
                X: {mousePosition.x}, Y: {mousePosition.y}
              </div>
            )}

            {/* Canvas */}
            <div className="p-8">
              <canvas 
                ref={canvasRef} 
                className="border border-border shadow-lg bg-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
