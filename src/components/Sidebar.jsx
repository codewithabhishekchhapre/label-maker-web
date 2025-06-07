
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Image, Type, Square, Circle, Star } from "lucide-react";

export const Sidebar = () => {
  const templates = [
    { id: 1, name: "Product Tag", size: "4x2 in" },
    { id: 2, name: "Price Tag", size: "3x1.5 in" },
    { id: 3, name: "Name Tag", size: "3.5x2.25 in" },
  ];

  const shapes = [
    { icon: Square, name: "Rectangle" },
    { icon: Circle, name: "Circle" },
    { icon: Star, name: "Star" },
  ];

  return (
    <div className="w-64 border-r bg-background flex flex-col">
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {/* Templates Section */}
          <div>
            <h3 className="font-medium text-sm text-muted-foreground mb-3">Templates</h3>
            <div className="space-y-2">
              {templates.map((template) => (
                <Button
                  key={template.id}
                  variant="ghost"
                  className="w-full justify-start h-auto p-3 flex-col items-start"
                >
                  <div className="w-full aspect-[2/1] bg-muted rounded mb-2"></div>
                  <div className="text-left">
                    <div className="font-medium text-sm">{template.name}</div>
                    <Badge variant="secondary" className="text-xs mt-1">
                      {template.size}
                    </Badge>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Shapes Section */}
          <div>
            <h3 className="font-medium text-sm text-muted-foreground mb-3">Shapes</h3>
            <div className="grid grid-cols-2 gap-2">
              {shapes.map((shape) => (
                <Button
                  key={shape.name}
                  variant="outline"
                  className="h-16 flex-col"
                >
                  <shape.icon className="h-6 w-6 mb-1" />
                  <span className="text-xs">{shape.name}</span>
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Elements Section */}
          <div>
            <h3 className="font-medium text-sm text-muted-foreground mb-3">Elements</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Type className="h-4 w-4 mr-2" />
                Text
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Image className="h-4 w-4 mr-2" />
                Image
              </Button>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};
