
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export default function DocumentationPage() {
  const mathConcepts = [
    {
      id: "algebra",
      title: "Algebra",
      description: "Foundational rules and operations for mathematical expressions",
      examples: [
        { latex: "x^2 - y^2 = (x+y)(x-y)", description: "Difference of squares" },
        { latex: "\\frac{a}{b} \\cdot \\frac{c}{d} = \\frac{ac}{bd}", description: "Multiplying fractions" }
      ]
    },
    {
      id: "calculus",
      title: "Calculus",
      description: "Study of continuous change and functions",
      examples: [
        { latex: "\\frac{d}{dx}[x^n] = nx^{n-1}", description: "Power rule for derivatives" },
        { latex: "\\int x^n dx = \\frac{x^{n+1}}{n+1} + C, \\quad n \\neq -1", description: "Power rule for integrals" }
      ]
    },
    {
      id: "linear-algebra",
      title: "Linear Algebra",
      description: "Study of vectors, matrices, and linear equations",
      examples: [
        { latex: "A \\times B \\neq B \\times A", description: "Matrix multiplication is not commutative" },
        { latex: "\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}^{-1} = \\frac{1}{ad-bc}\\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}", description: "2×2 matrix inverse" }
      ]
    }
  ];

  // LaTeX documentation sections
  const latexSections = [
    {
      id: "basic-formatting",
      title: "Basic Formatting",
      examples: [
        { code: "\\frac{numerator}{denominator}", description: "Fractions", example: "\\frac{x+1}{x^2}" },
        { code: "x^{power}", description: "Superscripts/powers", example: "e^{i\\pi}" },
        { code: "x_{subscript}", description: "Subscripts", example: "a_{ij}" }
      ]
    },
    {
      id: "symbols",
      title: "Mathematical Symbols",
      examples: [
        { code: "\\sum_{i=1}^{n}", description: "Summation", example: "\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}" },
        { code: "\\int_{a}^{b}", description: "Integration", example: "\\int_{0}^{\\infty} e^{-x} dx = 1" },
        { code: "\\prod_{i=1}^{n}", description: "Product", example: "\\prod_{i=1}^{n} i = n!" }
      ]
    },
    {
      id: "structures",
      title: "Mathematical Structures",
      examples: [
        { code: "\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}", description: "Matrices", example: "\\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix}" },
        { code: "\\begin{cases} ... \\end{cases}", description: "Cases", example: "f(x) = \\begin{cases} x^2 & x > 0 \\\\ 0 & x \\leq 0 \\end{cases}" },
        { code: "\\begin{align} ... \\end{align}", description: "Alignment", example: "\\begin{align} a &= b + c \\\\ &= d + e \\end{align}" }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Documentation"
        description="Learn about mathematical concepts and LaTeX syntax"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Mathematical Concepts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {mathConcepts.map((concept) => (
              <Collapsible key={concept.id} className="border rounded-lg p-2">
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="flex w-full justify-between p-2">
                    <span className="font-medium">{concept.title}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="px-4 pb-3 pt-1">
                  <p className="text-sm text-muted-foreground mb-3">{concept.description}</p>
                  <div className="space-y-3 border-t pt-2">
                    {concept.examples.map((ex, idx) => (
                      <div key={idx} className="bg-math-background rounded p-2">
                        <p className="text-xs text-muted-foreground mb-1">{ex.description}</p>
                        <BlockMath math={ex.latex} />
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>LaTeX Syntax Guide</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {latexSections.map((section) => (
              <Collapsible key={section.id} className="border rounded-lg p-2">
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="flex w-full justify-between p-2">
                    <span className="font-medium">{section.title}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="px-2 pb-3 pt-1">
                  <div className="space-y-3">
                    {section.examples.map((ex, idx) => (
                      <div key={idx} className="rounded p-2 bg-math-background">
                        <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
                          <span className="text-sm font-medium mb-1 sm:mb-0">{ex.description}</span>
                          <code className="text-xs bg-gray-200 dark:bg-gray-800 px-1 py-0.5 rounded">{ex.code}</code>
                        </div>
                        <div className="bg-white dark:bg-gray-950 p-2 rounded">
                          <InlineMath math={ex.example} />
                        </div>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
