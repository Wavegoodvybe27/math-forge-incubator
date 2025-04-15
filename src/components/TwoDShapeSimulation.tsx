import React, { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Circle, Square, Triangle, Hexagon, Pentagon, Octagon, Star } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { calculateShapeProperties } from "@/utils/shapeUtils";

const TwoDShapeSimulation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedShape, setSelectedShape] = useState<string>("circle");
  const [color, setColor] = useState<string>("#6366f1");
  const [fillColor, setFillColor] = useState<string>("#6366f1");
  const [strokeColor, setStrokeColor] = useState<string>("#000000");
  const [size, setSize] = useState<number>(50);
  const [rotation, setRotation] = useState<number>(0);
  const [position, setPosition] = useState({ x: 200, y: 150 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [strokeWidth, setStrokeWidth] = useState<number>(2);
  const [sides, setSides] = useState<number>(5);
  const [fillStyle, setFillStyle] = useState<string>("solid");
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [gridSize, setGridSize] = useState<number>(25);
  const [shapeProperties, setShapeProperties] = useState<any>(null);
  const animationRef = useRef<number | null>(null);
  
  const drawShape = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid if enabled
    if (showGrid) {
      drawGrid(ctx, canvas.width, canvas.height, gridSize);
    }
    
    // Save the current context state
    ctx.save();
    
    // Move to the position
    ctx.translate(position.x, position.y);
    
    // Apply rotation
    ctx.rotate(rotation);
    
    // Set the fill and stroke styles
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    
    // Create gradient if needed
    let gradient = null;
    if (fillStyle === "radial") {
      gradient = ctx.createRadialGradient(0, 0, 1, 0, 0, size);
      gradient.addColorStop(0, fillColor);
      gradient.addColorStop(1, strokeColor);
      ctx.fillStyle = gradient;
    } else if (fillStyle === "linear") {
      gradient = ctx.createLinearGradient(-size, -size, size, size);
      gradient.addColorStop(0, fillColor);
      gradient.addColorStop(1, strokeColor);
      ctx.fillStyle = gradient;
    }
    
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
        
      case "rectangle":
        ctx.beginPath();
        ctx.rect(-size * 1.5, -size, size * 3, size * 2);
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
        drawRegularPolygon(ctx, 0, 0, size, 6);
        break;
        
      case "pentagon":
        drawRegularPolygon(ctx, 0, 0, size, 5);
        break;
        
      case "octagon":
        drawRegularPolygon(ctx, 0, 0, size, 8);
        break;
        
      case "star":
        drawStar(ctx, 0, 0, size, 5, size / 2);
        break;
        
      case "polygon":
        drawRegularPolygon(ctx, 0, 0, size, sides);
        break;
        
      case "ellipse":
        ctx.beginPath();
        ctx.ellipse(0, 0, size * 1.5, size, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        break;
    }
    
    // Restore the context state
    ctx.restore();
  };
  
  const drawRegularPolygon = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, sides: number) => {
    ctx.beginPath();
    for (let i = 0; i < sides; i++) {
      const angle = (Math.PI * 2 * i) / sides;
      const pointX = x + radius * Math.cos(angle);
      const pointY = y + radius * Math.sin(angle);
      
      if (i === 0) {
        ctx.moveTo(pointX, pointY);
      } else {
        ctx.lineTo(pointX, pointY);
      }
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  };
  
  const drawStar = (
    ctx: CanvasRenderingContext2D, 
    x: number, 
    y: number, 
    outerRadius: number, 
    points: number, 
    innerRadius: number
  ) => {
    ctx.beginPath();
    for (let i = 0; i < points * 2; i++) {
      const angle = (Math.PI * i) / points;
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const pointX = x + radius * Math.sin(angle);
      const pointY = y + radius * Math.cos(angle);
      
      if (i === 0) {
        ctx.moveTo(pointX, pointY);
      } else {
        ctx.lineTo(pointX, pointY);
      }
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  };
  
  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number, spacing: number) => {
    ctx.strokeStyle = "rgba(0, 0, 0, 0.1)";
    ctx.lineWidth = 1;
    
    // Draw horizontal lines
    for (let y = 0; y < height; y += spacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    
    // Draw vertical lines
    for (let x = 0; x < width; x += spacing) {
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
    
    // Simple hit detection - checking if the click is within a circle around the shape's position
    // This should work for most shapes but could be improved for more complex hit detection
    const dx = x - position.x;
    const dy = y - position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Using a slightly larger hit area than the shape's size
    if (distance <= size * 1.2) {
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
  
  const handleCanvasTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    const dx = x - position.x;
    const dy = y - position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance <= size * 1.2) {
      setIsDragging(true);
      setDragStart({ x, y });
      e.preventDefault(); // Prevent scrolling on touch devices
    }
  };
  
  const handleCanvasTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    setPosition({
      x: position.x + (x - dragStart.x),
      y: position.y + (y - dragStart.y)
    });
    
    setDragStart({ x, y });
    e.preventDefault(); // Prevent scrolling on touch devices
  };
  
  const handleCanvasTouchEnd = (e: React.TouchEvent<HTMLCanvasElement>) => {
    setIsDragging(false);
  };
  
  const startAnimation = () => {
    let angle = 0;
    const animate = () => {
      setRotation(angle);
      angle += 0.05; // Speed of rotation
      if (angle > Math.PI * 2) angle = 0;
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
  };
  
  const stopAnimation = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  };
  
  useEffect(() => {
    drawShape();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [selectedShape, fillColor, strokeColor, strokeWidth, size, rotation, position, sides, fillStyle, showGrid, gridSize]);
  
  useEffect(() => {
    const properties = calculateShapeProperties(selectedShape, size, sides);
    setShapeProperties(properties);
  }, [selectedShape, size, sides]);
  
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
              onTouchStart={handleCanvasTouchStart}
              onTouchMove={handleCanvasTouchMove}
              onTouchEnd={handleCanvasTouchEnd}
            />
          </div>
          
          <Card className="mt-4">
            <CardHeader className="py-2">
              <CardTitle className="text-sm">Shape Properties</CardTitle>
            </CardHeader>
            <CardContent className="py-2">
              {shapeProperties ? (
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {Object.entries(shapeProperties).map(([key, value]: [string, any]) => (
                    <div key={key} className="flex justify-between">
                      <span className="font-medium">{key}:</span>
                      <span>{typeof value === 'number' ? value.toFixed(4) : value.toString()}</span>
                    </div>
                  ))}
                  {shapeProperties.goldenRatio && (
                    <div className="col-span-2 mt-2 bg-yellow-50 p-2 rounded-md border border-yellow-200">
                      <p className="text-xs text-amber-700">
                        <span className="font-semibold">Golden Ratio (φ): </span>
                        This shape exhibits the golden ratio (1.618...) in its proportions
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Select a shape to see its properties</p>
              )}
            </CardContent>
          </Card>
          
          <div className="flex flex-wrap gap-2 justify-between mt-4">
            <p className="text-xs text-muted-foreground text-center">
              Click and drag to move the shape
            </p>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={startAnimation}
                disabled={!!animationRef.current}
              >
                Animate
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={stopAnimation}
                disabled={!animationRef.current}
              >
                Stop
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Shape Controls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-2 mb-2">
            <Button
              onClick={() => setSelectedShape("circle")}
              variant={selectedShape === "circle" ? "default" : "outline"}
              className="flex items-center gap-2 text-xs"
            >
              <Circle className="h-4 w-4" />
              Circle
            </Button>
            <Button
              onClick={() => setSelectedShape("square")}
              variant={selectedShape === "square" ? "default" : "outline"}
              className="flex items-center gap-2 text-xs"
            >
              <Square className="h-4 w-4" />
              Square
            </Button>
            <Button
              onClick={() => setSelectedShape("triangle")}
              variant={selectedShape === "triangle" ? "default" : "outline"}
              className="flex items-center gap-2 text-xs"
            >
              <Triangle className="h-4 w-4" />
              Triangle
            </Button>
            <Button
              onClick={() => setSelectedShape("hexagon")}
              variant={selectedShape === "hexagon" ? "default" : "outline"}
              className="flex items-center gap-2 text-xs"
            >
              <Hexagon className="h-4 w-4" />
              Hexagon
            </Button>
            <Button
              onClick={() => setSelectedShape("rectangle")}
              variant={selectedShape === "rectangle" ? "default" : "outline"}
              className="flex items-center gap-2 text-xs"
            >
              <div className="h-4 w-5 border-2 rounded-sm"></div>
              Rectangle
            </Button>
            <Button
              onClick={() => setSelectedShape("pentagon")}
              variant={selectedShape === "pentagon" ? "default" : "outline"}
              className="flex items-center gap-2 text-xs"
            >
              <Pentagon className="h-4 w-4" />
              Pentagon
            </Button>
            <Button
              onClick={() => setSelectedShape("octagon")}
              variant={selectedShape === "octagon" ? "default" : "outline"}
              className="flex items-center gap-2 text-xs"
            >
              <Octagon className="h-4 w-4" />
              Octagon
            </Button>
            <Button
              onClick={() => setSelectedShape("star")}
              variant={selectedShape === "star" ? "default" : "outline"}
              className="flex items-center gap-2 text-xs"
            >
              <Star className="h-4 w-4" />
              Star
            </Button>
            <Button
              onClick={() => setSelectedShape("polygon")}
              variant={selectedShape === "polygon" ? "default" : "outline"}
              className="flex items-center gap-2 text-xs"
            >
              <Hexagon className="h-4 w-4" />
              Polygon
            </Button>
            <Button
              onClick={() => setSelectedShape("ellipse")}
              variant={selectedShape === "ellipse" ? "default" : "outline"}
              className="flex items-center gap-2 text-xs"
            >
              <div className="h-3 w-4 border-2 rounded-full"></div>
              Ellipse
            </Button>
          </div>
          
          {selectedShape === "polygon" && (
            <div className="space-y-2">
              <div className="flex justify-between">
                <p className="text-sm font-medium">Sides</p>
                <span className="text-sm text-muted-foreground">{sides}</span>
              </div>
              <Slider
                value={[sides]}
                min={3}
                max={12}
                step={1}
                onValueChange={(value) => setSides(value[0])}
              />
            </div>
          )}
          
          <div className="space-y-2">
            <p className="text-sm font-medium">Fill Style</p>
            <Select value={fillStyle} onValueChange={setFillStyle}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select fill style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="solid">Solid Color</SelectItem>
                <SelectItem value="linear">Linear Gradient</SelectItem>
                <SelectItem value="radial">Radial Gradient</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium">Fill Color</p>
            <div className="flex flex-wrap gap-2">
              {["#6366f1", "#8b5cf6", "#ec4899", "#f43f5e", "#f97316", "#eab308", "#84cc16", "#10b981", "#14b8a6", "#06b6d4"].map((c) => (
                <button
                  key={c}
                  onClick={() => setFillColor(c)}
                  className={`w-6 h-6 rounded-full ${
                    fillColor === c ? "ring-2 ring-offset-2 ring-math-primary" : ""
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
          
          {fillStyle !== "solid" && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Stroke Color</p>
              <div className="flex flex-wrap gap-2">
                {["#000000", "#6366f1", "#ec4899", "#f43f5e", "#f97316", "#eab308", "#84cc16"].map((c) => (
                  <button
                    key={c}
                    onClick={() => setStrokeColor(c)}
                    className={`w-6 h-6 rounded-full ${
                      strokeColor === c ? "ring-2 ring-offset-2 ring-math-primary" : ""
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>
          )}
          
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
              <p className="text-sm font-medium">Stroke Width</p>
              <span className="text-sm text-muted-foreground">{strokeWidth}px</span>
            </div>
            <Slider
              value={[strokeWidth]}
              min={0}
              max={10}
              step={1}
              onValueChange={(value) => setStrokeWidth(value[0])}
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
          
          <div className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              id="showGrid" 
              checked={showGrid} 
              onChange={(e) => setShowGrid(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-math-primary focus:ring-math-primary" 
            />
            <label htmlFor="showGrid" className="text-sm font-medium">
              Show Grid
            </label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TwoDShapeSimulation;
