
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";

const PRESET_FRAMES = [
  { name: "Desktop", width: 1440, height: 1024 },
  { name: "Tablet", width: 768, height: 1024 },
  { name: "Mobile", width: 375, height: 667 },
  { name: "Custom", width: 800, height: 600 },
];

export const FrameSelector = ({ onFrameSelect, selectedFrame }) => {
  const [customWidth, setCustomWidth] = useState(800);
  const [customHeight, setCustomHeight] = useState(600);
  const [showCustomInputs, setShowCustomInputs] = useState(false);

  const handleFrameChange = (frameName) => {
    const frame = PRESET_FRAMES.find(f => f.name === frameName);
    if (frame) {
      if (frameName === "Custom") {
        setShowCustomInputs(true);
        onFrameSelect({ ...frame, width: customWidth, height: customHeight });
      } else {
        setShowCustomInputs(false);
        onFrameSelect(frame);
      }
    }
  };

  const handleCustomSizeUpdate = () => {
    onFrameSelect({
      name: "Custom",
      width: customWidth,
      height: customHeight,
    });
  };

  return (
    <div className="flex items-center space-x-4 p-4 bg-background border-b">
      <div className="flex items-center space-x-2">
        <Label className="text-sm font-medium">Frame Size:</Label>
        <Select value={selectedFrame?.name || ""} onValueChange={handleFrameChange}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Select Frame Size" />
          </SelectTrigger>
          <SelectContent>
            {PRESET_FRAMES.map((frame) => (
              <SelectItem key={frame.name} value={frame.name}>
                {frame.name} ({frame.width}×{frame.height})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {showCustomInputs && (
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <Label className="text-xs">W:</Label>
            <Input
              type="number"
              value={customWidth}
              onChange={(e) => setCustomWidth(parseInt(e.target.value) || 800)}
              className="w-16 h-8 text-xs"
            />
          </div>
          <div className="flex items-center space-x-1">
            <Label className="text-xs">H:</Label>
            <Input
              type="number"
              value={customHeight}
              onChange={(e) => setCustomHeight(parseInt(e.target.value) || 600)}
              className="w-16 h-8 text-xs"
            />
          </div>
          <Button size="sm" onClick={handleCustomSizeUpdate}>
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      )}

      {selectedFrame && (
        <div className="text-sm text-muted-foreground">
          Current: {selectedFrame.name} - {selectedFrame.width}×{selectedFrame.height}
        </div>
      )}
    </div>
  );
};
