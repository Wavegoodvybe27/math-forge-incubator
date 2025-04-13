
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { LineChart, RefreshCw, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import * as math from "mathjs";

export function FunctionPlotter() {
  const [functions, setFunctions] = useState<Array<{ id: number; expression: string; color: string }>>([
    { id: 1, expression: "sin(x)", color: "#7C3AED" }
  ]);
  const [xRange, setXRange] = useState<{ min: number; max: number }>({ min: -10, max: 10 });
  const [yRange, setYRange] = useState<{ min: number; max: number }>({ min: -5, max: 5 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const addFunction = () => {
    const colors = ["#7C3AED", "#4F46E5", "#A78BFA", "#5B21B6", "#818CF8"];
    const newId = Math.max(0, ...functions.map(f => f.id)) + 1;
    const colorIndex = functions.length % colors.length;
    setFunctions([...functions, { id: newId, expression: "", color: colors[colorIndex] }]);
  };

  const removeFunction = (id: number) => {
    if (functions.length === 1) {
      toast({
        title: "Cannot remove",
        description: "At least one function must remain.",
        variant: "destructive"
      });
      return;
    }
    setFunctions(functions.filter(f => f.id !== id));
  };

  const updateFunction = (id: number, expression: string) => {
    setFunctions(functions.map(f => (f.id === id ? { ...f, expression } : f)));
  };

  const updateColor = (id: number, color: string) => {
    setFunctions(functions.map(f => (f.id === id ? { ...f, color } : f)));
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set up coordinate system
    const width = canvas.width;
    const height = canvas.height;
    const xScale = width / (xRange.max - xRange.min);
    const yScale = height / (yRange.max - yRange.min);

    // Draw axes
    ctx.beginPath();
    ctx.strokeStyle = "#CBD5E1";
    ctx.lineWidth = 1;

    // Draw grid
    const gridStep = Math.max(1, Math.floor((xRange.max - xRange.min) / 20));
    for (let x = Math.ceil(xRange.min / gridStep) * gridStep; x <= xRange.max; x += gridStep) {
      const canvasX = (x - xRange.min) * xScale;
      ctx.moveTo(canvasX, 0);
      ctx.lineTo(canvasX, height);
    }
    for (let y = Math.ceil(yRange.min / gridStep) * gridStep; y <= yRange.max; y += gridStep) {
      const canvasY = height - (y - yRange.min) * yScale;
      ctx.moveTo(0, canvasY);
      ctx.lineTo(width, canvasY);
    }
    ctx.stroke();

    // Draw x and y axes
    ctx.beginPath();
    ctx.strokeStyle = "#64748B";
    ctx.lineWidth = 2;
    
    // x-axis
    const yAxisPos = height - (-yRange.min) * yScale;
    ctx.moveTo(0, yAxisPos);
    ctx.lineTo(width, yAxisPos);

    // y-axis
    const xAxisPos = (-xRange.min) * xScale;
    ctx.moveTo(xAxisPos, 0);
    ctx.lineTo(xAxisPos, height);
    ctx.stroke();

    // Plot functions
    functions.forEach(func => {
      if (!func.expression.trim()) return;

      try {
        ctx.beginPath();
        ctx.strokeStyle = func.color;
        ctx.lineWidth = 2;

        const compiledFunction = math.compile(func.expression);

        let isFirstPoint = true;
        const numPoints = width;
        const step = (xRange.max - xRange.min) / numPoints;

        for (let i = 0; i <= numPoints; i++) {
          const x = xRange.min + i * step;
          try {
            const y = compiledFunction.evaluate({ x });
            if (math.isNaN(y) || !math.isFinite(y)) continue;

            const canvasX = (x - xRange.min) * xScale;
            const canvasY = height - (y - yRange.min) * yScale;

            if (canvasY < 0 || canvasY > height) continue;

            if (isFirstPoint) {
              ctx.moveTo(canvasX, canvasY);
              isFirstPoint = false;
            } else {
              ctx.lineTo(canvasX, canvasY);
            }
          } catch (e) {
            // Skip this point if evaluation fails
            continue;
          }
        }
        ctx.stroke();
      } catch (error) {
        console.error(`Error plotting function ${func.expression}:`, error);
      }
    });
  }, [functions, xRange, yRange]);

  const handlePlot = () => {
    // This will trigger the useEffect for redrawing
    setXRange({ ...xRange });
    toast({
      title: "Plot updated",
      description: "The function graph has been refreshed",
    });
  };

  // Resize canvas to parent size
  useEffect(() => {
    const resizeCanvas = () => {
      if (canvasRef.current && canvasRef.current.parentElement) {
        const parent = canvasRef.current.parentElement;
        canvasRef.current.width = parent.clientWidth;
        canvasRef.current.height = 400; // Fixed height or based on parent ratio
        handlePlot();
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  return (
    <Card className="shadow-sm border-2 border-math-highlight">
      <CardHeader className="pb-2">
        <CardTitle className="text-math-primary">Function Plotter</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="xMin">X Range</Label>
            <div className="flex gap-2">
              <Input
                id="xMin"
                type="number"
                value={xRange.min}
                onChange={(e) => setXRange({ ...xRange, min: parseFloat(e.target.value) })}
                placeholder="Min"
              />
              <Input
                id="xMax"
                type="number"
                value={xRange.max}
                onChange={(e) => setXRange({ ...xRange, max: parseFloat(e.target.value) })}
                placeholder="Max"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="yMin">Y Range</Label>
            <div className="flex gap-2">
              <Input
                id="yMin"
                type="number"
                value={yRange.min}
                onChange={(e) => setYRange({ ...yRange, min: parseFloat(e.target.value) })}
                placeholder="Min"
              />
              <Input
                id="yMax"
                type="number"
                value={yRange.max}
                onChange={(e) => setYRange({ ...yRange, max: parseFloat(e.target.value) })}
                placeholder="Max"
              />
            </div>
          </div>
          <div className="flex items-end">
            <Button onClick={handlePlot} className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" />
              Update Plot
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label>Functions</Label>
            <Button size="sm" variant="outline" onClick={addFunction}>
              <Plus className="h-4 w-4 mr-1" />
              Add Function
            </Button>
          </div>
          {functions.map((func) => (
            <div key={func.id} className="flex gap-2 items-center">
              <Input
                type="text"
                value={func.expression}
                onChange={(e) => updateFunction(func.id, e.target.value)}
                placeholder="e.g., sin(x), x^2, 2*x+1"
                className="font-mono"
              />
              <Input
                type="color"
                value={func.color}
                onChange={(e) => updateColor(func.id, e.target.value)}
                className="w-12 p-1 h-10"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeFunction(func.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <div className="canvas-container bg-white rounded-md border overflow-hidden">
          <canvas ref={canvasRef} className="w-full h-full"></canvas>
        </div>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        <div className="flex items-center">
          <LineChart className="h-4 w-4 mr-1" />
          Use mathematical expressions like sin(x), cos(x), x^2, sqrt(x), etc.
        </div>
      </CardFooter>
    </Card>
  );
}
