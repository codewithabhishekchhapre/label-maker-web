
import { useState } from "react";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { EnhancedDesignCanvas } from "../components/EnhancedDesignCanvas";
import { PropertiesPanel } from "../components/PropertiesPanel";
import { ToolsPanel } from "../components/ToolsPanel";

const Index = () => {
  const [activeTool, setActiveTool] = useState("select");
  const [selectedObject, setSelectedObject] = useState(null);
  const [canvasSize, setCanvasSize] = useState({ width: 1200, height: 800 });

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
          
          {/* Enhanced Canvas with Rulers and Grid */}
          <div className="flex-1 flex">
            <EnhancedDesignCanvas 
              activeTool={activeTool}
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
