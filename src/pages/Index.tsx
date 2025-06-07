
import { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { DesignCanvas } from "@/components/DesignCanvas";
import { PropertiesPanel } from "@/components/PropertiesPanel";
import { ToolsPanel } from "@/components/ToolsPanel";

const Index = () => {
  const [activeTool, setActiveTool] = useState<string>("select");
  const [selectedObject, setSelectedObject] = useState<any>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 400, height: 300 });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Templates & Assets */}
        <Sidebar />
        
        {/* Main Design Area */}
        <div className="flex-1 flex flex-col">
          {/* Tools Panel */}
          <ToolsPanel 
            activeTool={activeTool} 
            onToolChange={setActiveTool}
            canvasSize={canvasSize}
            onCanvasSizeChange={setCanvasSize}
          />
          
          {/* Canvas Container */}
          <div className="flex-1 flex justify-center items-center bg-muted/30 p-8">
            <DesignCanvas 
              activeTool={activeTool}
              canvasSize={canvasSize}
              onObjectSelect={setSelectedObject}
            />
          </div>
        </div>
        
        {/* Right Panel - Properties */}
        <PropertiesPanel selectedObject={selectedObject} />
      </div>
    </div>
  );
};

export default Index;
