
import { PageHeader } from "@/components/PageHeader";
import { FunctionPlotter } from "@/components/FunctionPlotter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineCurve, Circle, ArrowRight } from "lucide-react";

export default function FunctionPlotterPage() {
  const exampleFunctions = [
    { name: "Sine Wave", expr: "sin(x)" },
    { name: "Parabola", expr: "x^2" },
    { name: "Exponential", expr: "exp(x)" },
    { name: "Logarithm", expr: "log(x)" },
    { name: "Bell Curve", expr: "exp(-(x^2))" },
    { name: "Cubic", expr: "x^3" },
  ];
  
  return (
    <div className="space-y-6">
      <PageHeader
        title="Function Plotter"
        description="Plot mathematical functions and visualize data"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 md:col-span-2 space-y-4">
          <FunctionPlotter />
        </div>
        
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Example Functions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {exampleFunctions.map((func, index) => (
                  <Button 
                    key={index}
                    variant="outline"
                    className="h-auto py-2 justify-start text-left"
                  >
                    <div className="flex flex-col items-start">
                      <span className="text-xs text-muted-foreground">{func.name}</span>
                      <code className="text-sm font-mono">{func.expr}</code>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Plotting Tips</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-3">
              <div>
                <p className="font-medium flex items-center">
                  <LineCurve className="h-4 w-4 mr-1 text-math-primary" />
                  Multiple Functions
                </p>
                <p className="mt-1">
                  Add multiple functions to compare their behavior in the same plot.
                </p>
              </div>
              
              <div>
                <p className="font-medium flex items-center">
                  <Circle className="h-4 w-4 mr-1 text-math-primary" />
                  Adjust Ranges
                </p>
                <p className="mt-1">
                  Modify X and Y ranges to focus on specific regions of interest.
                </p>
              </div>
              
              <div>
                <p className="font-medium flex items-center">
                  <ArrowRight className="h-4 w-4 mr-1 text-math-primary" />
                  Function Syntax
                </p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Basic: <code>x^2, 2*x+1</code></li>
                  <li>Trig: <code>sin(x), cos(x), tan(x)</code></li>
                  <li>Exponential: <code>exp(x), log(x)</code></li>
                  <li>Constants: <code>pi, e</code></li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
