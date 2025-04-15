
import React, { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Circle, Square, Triangle, Hexagon } from "lucide-react";

const TwoDShapeSimulation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedShape, setSelectedShape] = useState<string>("circle");
  const [color, setColor] = useState<string>("#6366f1");
  const [size, setSize] = useState<number>(50);
  const [rotation, setRotation] = useState<number>(0);
  const [position, setPosition] = useState({ x: 200, y: 150 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const drawShape = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Save the current context state
    ctx.save();
    
    // Move to the position
    ctx.translate(position.x, position.y);
    
    // Apply rotation
    ctx.rotate(rotation);
    
    // Set the fill color
    ctx.fillStyle = color;
    ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
    ctx.lineWidth = 2;
    
    // Draw the selected shape
    switch (selectedShape) {
      case "circle":
        ctx.beginPath();
        ctx.arc(0, 0, size, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        break;
        
      case "square":
        ctx.beginPath();
        ctx.rect(-size, -size, size * 2, size * 2);
        ctx.fill();
        ctx.stroke();
        break;
        
      case "triangle":
        ctx.beginPath();
        ctx.moveTo(0, -size);
        ctx.lineTo(size * Math.cos(Math.PI / 6), size * Math.sin(Math.PI / 6));
        ctx.lineTo(-size * Math.cos(Math.PI / 6), size * Math.sin(Math.PI / 6));
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        break;
        
      case "hexagon":
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i;
          const x = size * Math.cos(angle);
          const y = size * Math.sin(angle);
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        break;
    }
    
    // Restore the context state
    ctx.restore();
    
    // Draw a grid (optional)
    drawGrid(ctx, canvas.width, canvas.height);
  };
  
  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.strokeStyle = "rgba(0, 0, 0, 0.1)";
    ctx.lineWidth = 1;
    
    // Draw horizontal lines
    for (let y = 0; y < height; y += 25) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    
    // Draw vertical lines
    for (let x = 0; x < width; x += 25) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
  };
  
  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Check if the click is within the shape
    const dx = x - position.x;
    const dy = y - position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance <= size) {
      setIsDragging(true);
      setDragStart({ x, y });
    }
  };
  
  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setPosition({
      x: position.x + (x - dragStart.x),
      y: position.y + (y - dragStart.y)
    });
    
    setDragStart({ x, y });
  };
  
  const handleCanvasMouseUp = () => {
    setIsDragging(false);
  };
  
  useEffect(() => {
    drawShape();
  }, [selectedShape, color, size, rotation, position]);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <CardHeader className="bg-math-background">
          <CardTitle>2D Shape Simulation</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="border rounded-md">
            <canvas 
              ref={canvasRef} 
              width={400} 
              height={300}
              className="w-full h-full touch-none cursor-move"
              onMouseDown={handleCanvasMouseDown}
              onMouseMove={handleCanvasMouseMove}
              onMouseUp={handleCanvasMouseUp}
              onMouseLeave={handleCanvasMouseUp}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Click and drag to move the shape
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Shape Controls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={() => setSelectedShape("circle")}
              variant={selectedShape === "circle" ? "default" : "outline"}
              className="flex items-center gap-2"
            >
              <Circle className="h-4 w-4" />
              Circle
            </Button>
            <Button
              onClick={() => setSelectedShape("square")}
              variant={selectedShape === "square" ? "default" : "outline"}
              className="flex items-center gap-2"
            >
              <Square className="h-4 w-4" />
              Square
            </Button>
            <Button
              onClick={() => setSelectedShape("triangle")}
              variant={selectedShape === "triangle" ? "default" : "outline"}
              className="flex items-center gap-2"
            >
              <Triangle className="h-4 w-4" />
              Triangle
            </Button>
            <Button
              onClick={() => setSelectedShape("hexagon")}
              variant={selectedShape === "hexagon" ? "default" : "outline"}
              className="flex items-center gap-2"
            >
              <Hexagon className="h-4 w-4" />
              Hexagon
            </Button>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium">Color</p>
            <div className="flex gap-2">
              {["#6366f1", "#8b5cf6", "#ec4899", "#f43f5e", "#f97316", "#eab308"].map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-6 h-6 rounded-full ${
                    color === c ? "ring-2 ring-offset-2 ring-math-primary" : ""
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <p className="text-sm font-medium">Size</p>
              <span className="text-sm text-muted-foreground">{size}px</span>
            </div>
            <Slider
              value={[size]}
              min={10}
              max={100}
              step={1}
              onValueChange={(value) => setSize(value[0])}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <p className="text-sm font-medium">Rotation</p>
              <span className="text-sm text-muted-foreground">{Math.round(rotation * 180 / Math.PI)}°</span>
            </div>
            <Slider
              value={[rotation]}
              min={0}
              max={Math.PI * 2}
              step={0.1}
              onValueChange={(value) => setRotation(value[0])}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TwoDShapeSimulation;
