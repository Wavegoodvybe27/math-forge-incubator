
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import * as math from "mathjs";
import { Calculator as CalculatorIcon, X } from "lucide-react";

export function Calculator() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<{ expression: string; result: string }[]>([]);
  const [mode, setMode] = useState<"standard" | "scientific">("standard");
  const { toast } = useToast();

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
        ? Number(result.toFixed(4)).toString()
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
            <CardTitle className="text-math-primary">
              {mode === "standard" ? "Standard Calculator" : "Scientific Calculator"}
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
                    className="p-3 rounded-md bg-accent/50 font-mono"
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
