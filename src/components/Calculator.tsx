
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import * as math from "mathjs";
import { 
  Calculator as CalculatorIcon, 
  X, 
  LineChart,
  Trash2,
  RefreshCw,
  Plus
} from "lucide-react";
import { Label } from "@/components/ui/label";

export function Calculator() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<{ expression: string; result: string }[]>([]);
  const [mode, setMode] = useState<"standard" | "scientific">("standard");
  const [graphMode, setGraphMode] = useState(false);
  
  // Graph state
  const [functions, setFunctions] = useState<Array<{ id: number; expression: string; color: string }>>([
    { id: 1, expression: "x^2", color: "#7C3AED" }
  ]);
  const [xRange, setXRange] = useState<{ min: number; max: number }>({ min: -10, max: 10 });
  const [yRange, setYRange] = useState<{ min: number; max: number }>({ min: -10, max: 10 });
  const { toast } = useToast();
  const [canvasRef, setCanvasRef] = useState<HTMLCanvasElement | null>(null);

  const handleButtonClick = (value: string) => {
    if (value === "=") {
      calculate();
    } else if (value === "C") {
      setInput("");
    } else if (value === "⌫") {
      setInput(input.slice(0, -1));
    } else {
      setInput(input + value);
    }
  };

  const calculate = () => {
    if (!input) return;

    try {
      const result = math.evaluate(input);
      const formattedResult = typeof result === "number" && !Number.isInteger(result)
        ? Number(result.toFixed(8)).toString()
        : result.toString();
      
      setHistory([{ expression: input, result: formattedResult }, ...history]);
      setInput(formattedResult);
      
    } catch (error) {
      toast({
        title: "Calculation Error",
        description: "Invalid expression. Please check your input.",
        variant: "destructive",
      });
    }
  };

  const clearHistory = () => {
    setHistory([]);
    toast({
      title: "History cleared",
      description: "Your calculation history has been cleared.",
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      calculate();
    }
  };

  // Graph functions
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

  const drawGraph = () => {
    if (!canvasRef) return;

    const canvas = canvasRef;
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
            
            // Fix for the math.isFinite error - use Number.isFinite instead
            if (isNaN(y) || !Number.isFinite(y)) continue;

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
  };

  // Set up the canvas reference and handle resize
  const canvasRefCallback = (element: HTMLCanvasElement | null) => {
    if (element) {
      setCanvasRef(element);
      element.width = element.parentElement?.clientWidth || 600;
      element.height = 400;
      setTimeout(drawGraph, 0);
    }
  };

  // Redraw graph when any relevant state changes
  const handleUpdateGraph = () => {
    setTimeout(drawGraph, 0);
    toast({
      title: "Graph updated",
      description: "The function graph has been refreshed",
    });
  };

  const toggleGraphMode = () => {
    setGraphMode(!graphMode);
    // Allow time for the canvas to be rendered before drawing
    if (!graphMode) {
      setTimeout(drawGraph, 100);
    }
  };

  return (
    <Tabs defaultValue="calculator" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="calculator" className="flex items-center">
          <CalculatorIcon className="h-4 w-4 mr-2" />
          Calculator
        </TabsTrigger>
        <TabsTrigger value="history">History</TabsTrigger>
      </TabsList>
      
      <TabsContent value="calculator">
        <Card className="shadow-sm border-2 border-math-highlight">
          <CardHeader className="pb-2">
            <CardTitle className="text-math-primary flex justify-between items-center">
              <span>{mode === "standard" ? "Standard Calculator" : "Scientific Calculator"}</span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={toggleGraphMode}
                className={graphMode ? "bg-math-highlight" : ""}
              >
                <LineChart className="h-4 w-4 mr-2" />
                {graphMode ? "Hide Graph" : "Show Graph"}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex mb-2 gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setMode("standard")}
                  className={mode === "standard" ? "bg-math-highlight" : ""}
                >
                  Standard
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setMode("scientific")}
                  className={mode === "scientific" ? "bg-math-highlight" : ""}
                >
                  Scientific
                </Button>
              </div>
              
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="text-xl h-14 font-mono text-right"
                placeholder="0"
              />

              {graphMode && (
                <div className="space-y-4 mb-4 animate-fade-in">
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
                      <Button onClick={handleUpdateGraph} className="w-full">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Update Graph
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
                    <canvas ref={canvasRefCallback} className="w-full h-full"></canvas>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-4 gap-2">
                {mode === "standard" ? (
                  <>
                    <Button variant="outline" onClick={() => handleButtonClick("7")}>7</Button>
                    <Button variant="outline" onClick={() => handleButtonClick("8")}>8</Button>
                    <Button variant="outline" onClick={() => handleButtonClick("9")}>9</Button>
                    <Button variant="secondary" onClick={() => handleButtonClick("/")}>÷</Button>
                    <Button variant="outline" onClick={() => handleButtonClick("4")}>4</Button>
                    <Button variant="outline" onClick={() => handleButtonClick("5")}>5</Button>
                    <Button variant="outline" onClick={() => handleButtonClick("6")}>6</Button>
                    <Button variant="secondary" onClick={() => handleButtonClick("*")}>×</Button>
                    <Button variant="outline" onClick={() => handleButtonClick("1")}>1</Button>
                    <Button variant="outline" onClick={() => handleButtonClick("2")}>2</Button>
                    <Button variant="outline" onClick={() => handleButtonClick("3")}>3</Button>
                    <Button variant="secondary" onClick={() => handleButtonClick("-")}>−</Button>
                    <Button variant="outline" onClick={() => handleButtonClick("0")}>0</Button>
                    <Button variant="outline" onClick={() => handleButtonClick(".")}>.</Button>
                    <Button variant="default" onClick={() => handleButtonClick("=")}>=</Button>
                    <Button variant="secondary" onClick={() => handleButtonClick("+")}>+</Button>
                    <Button variant="destructive" onClick={() => handleButtonClick("C")} className="col-span-2">C</Button>
                    <Button variant="secondary" onClick={() => handleButtonClick("⌫")} className="col-span-2">⌫</Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" onClick={() => handleButtonClick("(")}>(</Button>
                    <Button variant="outline" onClick={() => handleButtonClick(")")}>)</Button>
                    <Button variant="secondary" onClick={() => handleButtonClick("^")}>x^y</Button>
                    <Button variant="secondary" onClick={() => handleButtonClick("/")}>÷</Button>
                    
                    <Button variant="outline" onClick={() => handleButtonClick("7")}>7</Button>
                    <Button variant="outline" onClick={() => handleButtonClick("8")}>8</Button>
                    <Button variant="outline" onClick={() => handleButtonClick("9")}>9</Button>
                    <Button variant="secondary" onClick={() => handleButtonClick("*")}>×</Button>
                    
                    <Button variant="outline" onClick={() => handleButtonClick("4")}>4</Button>
                    <Button variant="outline" onClick={() => handleButtonClick("5")}>5</Button>
                    <Button variant="outline" onClick={() => handleButtonClick("6")}>6</Button>
                    <Button variant="secondary" onClick={() => handleButtonClick("-")}>−</Button>
                    
                    <Button variant="outline" onClick={() => handleButtonClick("1")}>1</Button>
                    <Button variant="outline" onClick={() => handleButtonClick("2")}>2</Button>
                    <Button variant="outline" onClick={() => handleButtonClick("3")}>3</Button>
                    <Button variant="secondary" onClick={() => handleButtonClick("+")}>+</Button>
                    
                    <Button variant="outline" onClick={() => handleButtonClick("0")}>0</Button>
                    <Button variant="outline" onClick={() => handleButtonClick(".")}>.</Button>
                    <Button variant="default" onClick={() => handleButtonClick("=")}>=</Button>
                    <Button variant="destructive" onClick={() => handleButtonClick("C")}>C</Button>
                    
                    <Button variant="secondary" onClick={() => handleButtonClick("sin(")}>sin</Button>
                    <Button variant="secondary" onClick={() => handleButtonClick("cos(")}>cos</Button>
                    <Button variant="secondary" onClick={() => handleButtonClick("tan(")}>tan</Button>
                    <Button variant="secondary" onClick={() => handleButtonClick("⌫")}>⌫</Button>
                    
                    <Button variant="secondary" onClick={() => handleButtonClick("sqrt(")}>√</Button>
                    <Button variant="secondary" onClick={() => handleButtonClick("log(")}>log</Button>
                    <Button variant="secondary" onClick={() => handleButtonClick("ln(")}>ln</Button>
                    <Button variant="secondary" onClick={() => handleButtonClick("pi")}>π</Button>
                    
                    <Button variant="secondary" onClick={() => handleButtonClick("abs(")}>|x|</Button>
                    <Button variant="secondary" onClick={() => handleButtonClick("e")}>e</Button>
                    <Button variant="secondary" onClick={() => handleButtonClick("!")}><span className="text-xs">x!</span></Button>
                    <Button variant="secondary" onClick={() => handleButtonClick("%")}>%</Button>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="history">
        <Card className="shadow-sm border-2 border-math-highlight">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-math-primary">Calculation History</CardTitle>
            {history.length > 0 && (
              <Button variant="ghost" size="sm" onClick={clearHistory}>
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {history.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No calculations yet</p>
            ) : (
              <div className="space-y-2">
                {history.map((item, index) => (
                  <div 
                    key={index}
                    className="p-3 rounded-md bg-accent/50 font-mono cursor-pointer"
                    onClick={() => setInput(item.result)}
                  >
                    <div className="text-sm text-muted-foreground">{item.expression}</div>
                    <div className="text-lg font-semibold">{item.result}</div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
