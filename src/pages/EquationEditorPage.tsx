
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

  // LaTeX tips with code examples
  const latexTips = [
    { 
      name: "Fractions", 
      code: "\\frac{numerator}{denominator}", 
      example: "\\frac{x+1}{x-1}" 
    },
    { 
      name: "Powers", 
      code: "x^{power}", 
      example: "x^{2n+1}" 
    },
    { 
      name: "Subscripts", 
      code: "x_{subscript}", 
      example: "x_{i,j}" 
    },
    { 
      name: "Square Root", 
      code: "\\sqrt{x}", 
      example: "\\sqrt{x^2 + y^2}" 
    },
    { 
      name: "Greek Letters", 
      code: "\\alpha, \\beta, \\gamma", 
      example: "\\alpha + \\beta = \\gamma" 
    },
    { 
      name: "Infinity", 
      code: "\\infty", 
      example: "\\lim_{x \\to \\infty} f(x)" 
    },
    { 
      name: "Summation", 
      code: "\\sum_{i=0}^{n} x_i", 
      example: "\\sum_{i=1}^{n} i^2 = \\frac{n(n+1)(2n+1)}{6}" 
    },
    { 
      name: "Integration", 
      code: "\\int_{a}^{b} f(x) dx", 
      example: "\\int_{0}^{\\pi} \\sin(x) dx = 2" 
    },
    { 
      name: "Matrices", 
      code: "\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}", 
      example: "\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} \\cdot \\begin{pmatrix} x \\\\ y \\end{pmatrix} = \\begin{pmatrix} ax + by \\\\ cx + dy \\end{pmatrix}" 
    }
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
                  {latexTips.slice(0, 6).map((tip, index) => (
                    <li key={index}>
                      {tip.name}: <code>{tip.code}</code>
                    </li>
                  ))}
                </ul>
                <p className="font-medium mt-3">Structures:</p>
                <ul className="list-disc pl-5 space-y-1">
                  {latexTips.slice(6).map((tip, index) => (
                    <li key={index}>
                      {tip.name}: <code>{tip.code}</code>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
