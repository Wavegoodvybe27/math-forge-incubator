
import { PageHeader } from "@/components/PageHeader";
import { EquationEditor } from "@/components/EquationEditor";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { Button } from "@/components/ui/button";
import { FileUp, Save } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function EquationEditorPage() {
  const [savedEquations, setSavedEquations] = useState<{id: string; latex: string}[]>([
    { id: "eq1", latex: "E = mc^2" },
    { id: "eq2", latex: "F = G\\frac{m_1 m_2}{r^2}" },
    { id: "eq3", latex: "\\nabla \\times \\vec{E} = -\\frac{\\partial \\vec{B}}{\\partial t}" }
  ]);
  const [activeEquation, setActiveEquation] = useState("");
  const { toast } = useToast();

  const saveEquation = (latex: string) => {
    const newEquation = {
      id: `eq${Date.now()}`,
      latex
    };
    setSavedEquations([newEquation, ...savedEquations]);
    toast({
      title: "Equation saved",
      description: "Your equation has been saved successfully"
    });
  };

  const commonEquations = [
    { name: "Pythagorean Theorem", latex: "a^2 + b^2 = c^2" },
    { name: "Quadratic Formula", latex: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}" },
    { name: "Taylor Series", latex: "f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(a)}{n!} (x-a)^n" },
    { name: "Euler's Identity", latex: "e^{i\\pi} + 1 = 0" }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Equation Editor"
        description="Create and edit mathematical equations"
        action={
          activeEquation && (
            <Button onClick={() => saveEquation(activeEquation)}>
              <Save className="mr-2 h-4 w-4" />
              Save Equation
            </Button>
          )
        }
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 md:col-span-2">
          <EquationEditor initialValue="" onSave={(latex) => setActiveEquation(latex)} />
          
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-sm">Common Equations</CardTitle>
              <CardDescription>Click to insert into the editor</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {commonEquations.map((equation, index) => (
                  <Button 
                    key={index} 
                    variant="outline" 
                    onClick={() => setActiveEquation(equation.latex)}
                    className="h-auto py-2 justify-start"
                  >
                    <div className="flex flex-col items-start">
                      <span className="text-xs text-muted-foreground mb-1">{equation.name}</span>
                      <InlineMath math={equation.latex} />
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Saved Equations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {savedEquations.length > 0 ? (
                savedEquations.map((equation) => (
                  <div 
                    key={equation.id}
                    className="p-3 rounded-md bg-math-background hover:bg-math-highlight cursor-pointer transition-colors"
                    onClick={() => setActiveEquation(equation.latex)}
                  >
                    <InlineMath math={equation.latex} />
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <FileUp className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No saved equations yet</p>
                  <p className="text-xs mt-1">Save equations to see them here</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">LaTeX Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p className="font-medium">Common Symbols:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Fractions: <code>\frac{num}{denom}</code></li>
                  <li>Powers: <code>x^{power}</code></li>
                  <li>Subscripts: <code>x_{subscript}</code></li>
                  <li>Square root: <code>\sqrt{x}</code></li>
                  <li>Greek letters: <code>\alpha, \beta, \gamma</code></li>
                  <li>Infinity: <code>\infty</code></li>
                </ul>
                <p className="font-medium mt-3">Structures:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Summation: <code>\sum_{i=0}^{n} x_i</code></li>
                  <li>Integration: <code>\int_{a}^{b} f(x) dx</code></li>
                  <li>Matrices: <code>\begin{matrix}...</code></li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
