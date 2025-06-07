
import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas, Rect, Circle, Textbox } from "fabric";

interface DesignCanvasProps {
  activeTool: string;
  canvasSize: { width: number; height: number };
  onObjectSelect: (object: any) => void;
}

export const DesignCanvas = ({ activeTool, canvasSize, onObjectSelect }: DesignCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: canvasSize.width,
      height: canvasSize.height,
      backgroundColor: "#ffffff",
    });

    canvas.on("selection:created", (e) => {
      onObjectSelect(e.selected?.[0]);
    });

    canvas.on("selection:updated", (e) => {
      onObjectSelect(e.selected?.[0]);
    });

    canvas.on("selection:cleared", () => {
      onObjectSelect(null);
    });

    setFabricCanvas(canvas);

    return () => {
      canvas.dispose();
    };
  }, []);

  useEffect(() => {
    if (!fabricCanvas) return;
    
    fabricCanvas.setDimensions({
      width: canvasSize.width,
      height: canvasSize.height,
    });
  }, [canvasSize, fabricCanvas]);

  useEffect(() => {
    if (!fabricCanvas) return;

    const handleClick = (e: any) => {
      if (activeTool === "rectangle") {
        const rect = new Rect({
          left: e.pointer.x - 50,
          top: e.pointer.y - 25,
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
          left: e.pointer.x - 25,
          top: e.pointer.y - 25,
          radius: 25,
          fill: "#10b981",
          stroke: "#059669",
          strokeWidth: 1,
        });
        fabricCanvas.add(circle);
        fabricCanvas.setActiveObject(circle);
      } else if (activeTool === "text") {
        const text = new Textbox("Enter text", {
          left: e.pointer.x,
          top: e.pointer.y,
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

  return (
    <div className="border border-border rounded-lg shadow-lg bg-white">
      <canvas ref={canvasRef} className="block" />
    </div>
  );
};
