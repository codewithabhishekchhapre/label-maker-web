
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { MousePointer, Square, Circle, Type, Trash2 } from "lucide-react";

interface ToolsPanelProps {
  activeTool: string;
  onToolChange: (tool: string) => void;
  canvasSize: { width: number; height: number };
  onCanvasSizeChange: (size: { width: number; height: number }) => void;
}

export const ToolsPanel = ({ 
  activeTool, 
  onToolChange, 
  canvasSize, 
  onCanvasSizeChange 
}: ToolsPanelProps) => {
  const tools = [
    { id: "select", icon: MousePointer, label: "Select" },
    { id: "rectangle", icon: Square, label: "Rectangle" },
    { id: "circle", icon: Circle, label: "Circle" },
    { id: "text", icon: Type, label: "Text" },
  ];

  return (
    <div className="border-b bg-background p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {tools.map((tool) => (
            <Button
              key={tool.id}
              variant={activeTool === tool.id ? "default" : "outline"}
              size="sm"
              onClick={() => onToolChange(tool.id)}
              className="flex items-center space-x-1"
            >
              <tool.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{tool.label}</span>
            </Button>
          ))}
          
          <Separator orientation="vertical" className="h-6" />
          
          <Button variant="outline" size="sm">
            <Trash2 className="h-4 w-4" />
            <span className="hidden sm:inline ml-1">Delete</span>
          </Button>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Label htmlFor="width" className="text-sm">Width:</Label>
            <Input
              id="width"
              type="number"
              value={canvasSize.width}
              onChange={(e) => onCanvasSizeChange({
                ...canvasSize,
                width: parseInt(e.target.value) || 400
              })}
              className="w-20 h-8"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor="height" className="text-sm">Height:</Label>
            <Input
              id="height"
              type="number"
              value={canvasSize.height}
              onChange={(e) => onCanvasSizeChange({
                ...canvasSize,
                height: parseInt(e.target.value) || 300
              })}
              className="w-20 h-8"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
