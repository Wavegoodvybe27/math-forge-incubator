
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

export default function DocumentationPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Documentation"
        description="Learn how to use Math Forge for mathematical framework development"
      />
      
      <Tabs defaultValue="overview">
        <TabsList className="mb-4 w-full overflow-x-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="equations">Equation Editor</TabsTrigger>
          <TabsTrigger value="plotter">Function Plotter</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="calculator">Calculator</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Math Forge Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Math Forge is a comprehensive tool designed for developing mathematical frameworks,
                allowing you to create, visualize, and document mathematical concepts in one place.
              </p>
              
              <h3 className="text-lg font-medium mt-4">Key Features</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Equation Editor:</strong> Create and edit mathematical equations using LaTeX syntax
                </li>
                <li>
                  <strong>Function Plotter:</strong> Visualize mathematical functions with an interactive plotting tool
                </li>
                <li>
                  <strong>Notes:</strong> Document your mathematical framework with structured notes and embedded equations
                </li>
                <li>
                  <strong>Calculator:</strong> Perform calculations with a standard and scientific calculator
                </li>
              </ul>
              
              <h3 className="text-lg font-medium mt-4">Getting Started</h3>
              <p>
                Begin by exploring each tool through the sidebar navigation. Each component
                is designed to work together, allowing you to build a comprehensive mathematical framework.
              </p>
              <p>
                For example, you can create equations in the Equation Editor, visualize them in the Function Plotter,
                document your insights in Notes, and verify calculations with the Calculator.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="equations">
          <Card>
            <CardHeader>
              <CardTitle>Equation Editor Guide</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                The Equation Editor allows you to create mathematical equations using LaTeX syntax,
                which is the standard for mathematical typesetting.
              </p>
              
              <h3 className="text-lg font-medium mt-4">Basic LaTeX Syntax</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="font-medium">Fractions:</p>
                  <pre className="bg-math-background p-2 rounded-md font-mono text-sm">\frac{numerator}{denominator}</pre>
                  <div className="p-2 bg-muted rounded-md">
                    <InlineMath math="\frac{a}{b}" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="font-medium">Powers and Subscripts:</p>
                  <pre className="bg-math-background p-2 rounded-md font-mono text-sm">x^2, x_i, x^{a+b}</pre>
                  <div className="p-2 bg-muted rounded-md">
                    <InlineMath math="x^2, x_i, x^{a+b}" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="font-medium">Square Roots:</p>
                  <pre className="bg-math-background p-2 rounded-md font-mono text-sm">\sqrt{x}, \sqrt[n]{x}</pre>
                  <div className="p-2 bg-muted rounded-md">
                    <InlineMath math="\sqrt{x}, \sqrt[n]{x}" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="font-medium">Greek Letters:</p>
                  <pre className="bg-math-background p-2 rounded-md font-mono text-sm">\alpha, \beta, \gamma, \delta</pre>
                  <div className="p-2 bg-muted rounded-md">
                    <InlineMath math="\alpha, \beta, \gamma, \delta" />
                  </div>
                </div>
              </div>
              
              <h3 className="text-lg font-medium mt-6">Advanced Examples</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-medium">Summation:</p>
                  <pre className="bg-math-background p-2 rounded-md font-mono text-sm">\sum_{i=1}^{n} i^2</pre>
                  <div className="p-3 bg-muted rounded-md">
                    <BlockMath math="\sum_{i=1}^{n} i^2" />
                  </div>
                </div>
                
                <div>
                  <p className="font-medium">Integration:</p>
                  <pre className="bg-math-background p-2 rounded-md font-mono text-sm">\int_{a}^{b} f(x) \, dx</pre>
                  <div className="p-3 bg-muted rounded-md">
                    <BlockMath math="\int_{a}^{b} f(x) \, dx" />
                  </div>
                </div>
                
                <div>
                  <p className="font-medium">Matrix:</p>
                  <pre className="bg-math-background p-2 rounded-md font-mono text-sm">\begin{pmatrix} a & b \\ c & d \end{pmatrix}</pre>
                  <div className="p-3 bg-muted rounded-md">
                    <BlockMath math="\begin{pmatrix} a & b \\ c & d \end{pmatrix}" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="plotter">
          <Card>
            <CardHeader>
              <CardTitle>Function Plotter Guide</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                The Function Plotter allows you to visualize mathematical functions and their relationships.
                Input expressions using standard mathematical notation.
              </p>
              
              <h3 className="text-lg font-medium mt-4">Supported Functions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">Basic Operations:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><code>+, -, *, /</code> (addition, subtraction, multiplication, division)</li>
                    <li><code>^</code> or <code>**</code> (exponentiation)</li>
                    <li><code>()</code> (parentheses for grouping)</li>
                  </ul>
                </div>
                
                <div>
                  <p className="font-medium">Trigonometric Functions:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><code>sin(x), cos(x), tan(x)</code></li>
                    <li><code>asin(x), acos(x), atan(x)</code></li>
                    <li><code>sinh(x), cosh(x), tanh(x)</code></li>
                  </ul>
                </div>
                
                <div>
                  <p className="font-medium">Logarithmic Functions:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><code>log(x)</code> (natural logarithm)</li>
                    <li><code>log10(x)</code> (base-10 logarithm)</li>
                    <li><code>exp(x)</code> (e^x)</li>
                  </ul>
                </div>
                
                <div>
                  <p className="font-medium">Other Functions:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><code>sqrt(x)</code> (square root)</li>
                    <li><code>abs(x)</code> (absolute value)</li>
                    <li><code>floor(x), ceil(x)</code> (rounding)</li>
                  </ul>
                </div>
              </div>
              
              <h3 className="text-lg font-medium mt-6">Example Expressions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-math-background rounded-md">
                  <p className="font-medium">Sine Wave:</p>
                  <code className="font-mono">sin(x)</code>
                </div>
                
                <div className="p-3 bg-math-background rounded-md">
                  <p className="font-medium">Parabola:</p>
                  <code className="font-mono">x^2</code>
                </div>
                
                <div className="p-3 bg-math-background rounded-md">
                  <p className="font-medium">Combination:</p>
                  <code className="font-mono">2*sin(x) + 0.5*x^2</code>
                </div>
                
                <div className="p-3 bg-math-background rounded-md">
                  <p className="font-medium">Rational Function:</p>
                  <code className="font-mono">(x^2-1)/(x^2+1)</code>
                </div>
              </div>
              
              <h3 className="text-lg font-medium mt-6">Plotting Tips</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Adjust X and Y ranges</strong> to focus on regions of interest
                </li>
                <li>
                  <strong>Add multiple functions</strong> with different colors to compare behavior
                </li>
                <li>
                  <strong>Use Update Plot</strong> after making changes to see the new graph
                </li>
                <li>
                  <strong>Watch for asymptotes</strong> where functions may behave unpredictably
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notes">
          <Card>
            <CardHeader>
              <CardTitle>Notes Guide</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                The Notes section allows you to document your mathematical framework,
                create structured notes, and integrate equations with your text.
              </p>
              
              <h3 className="text-lg font-medium mt-4">Key Features</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Multiple Notes:</strong> Create and organize separate notes for different topics
                </li>
                <li>
                  <strong>Equation Integration:</strong> Add mathematical equations directly to your notes
                </li>
                <li>
                  <strong>Export/Import:</strong> Save and share your mathematical documentation
                </li>
              </ul>
              
              <h3 className="text-lg font-medium mt-6">Best Practices</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-medium">Structure Your Notes:</p>
                  <p>
                    Organize notes with clear titles and logical sections. Use consistent formatting
                    to distinguish between definitions, theorems, proofs, and examples.
                  </p>
                </div>
                
                <div>
                  <p className="font-medium">Integrate Equations:</p>
                  <p>
                    Use the "Add Equation" button to insert mathematical expressions that support your text.
                    Reference these equations in your notes for clarity.
                  </p>
                </div>
                
                <div>
                  <p className="font-medium">Regular Exports:</p>
                  <p>
                    Periodically export your notes to ensure you have backups of your mathematical framework.
                    This also allows you to share your work with colleagues.
                  </p>
                </div>
              </div>
              
              <h3 className="text-lg font-medium mt-6">Example Workflow</h3>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Create a new note titled "Framework Definition"</li>
                <li>Document the core principles and axioms of your mathematical framework</li>
                <li>Add equations to formalize key concepts</li>
                <li>Create additional notes for theorems, proofs, and applications</li>
                <li>Link concepts between notes to build a comprehensive framework</li>
                <li>Export your notes for backup or sharing</li>
              </ol>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="calculator">
          <Card>
            <CardHeader>
              <CardTitle>Calculator Guide</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                The Calculator provides both standard and scientific calculation capabilities
                to verify mathematical results and explore numerical values.
              </p>
              
              <h3 className="text-lg font-medium mt-4">Modes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-math-background rounded-md">
                  <p className="font-medium">Standard Mode</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Basic arithmetic operations (+, -, ×, ÷)</li>
                    <li>Decimal and negative numbers</li>
                    <li>Ideal for simple calculations</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-math-background rounded-md">
                  <p className="font-medium">Scientific Mode</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Advanced functions (sin, cos, tan, log, etc.)</li>
                    <li>Constants (π, e)</li>
                    <li>Parentheses for complex expressions</li>
                    <li>Powers and roots</li>
                  </ul>
                </div>
              </div>
              
              <h3 className="text-lg font-medium mt-6">Usage Tips</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Scientific Notation:</strong> For very large or small numbers, the calculator will use scientific notation
                </li>
                <li>
                  <strong>History Tab:</strong> View and reuse previous calculations by clicking on them
                </li>
                <li>
                  <strong>Complex Expressions:</strong> Build complex expressions with parentheses to ensure correct evaluation order
                </li>
                <li>
                  <strong>Error Checking:</strong> The calculator will display an error message for invalid expressions
                </li>
              </ul>
              
              <h3 className="text-lg font-medium mt-6">Example Calculations</h3>
              <div className="space-y-3">
                <div className="p-3 bg-muted rounded-md font-mono">
                  <p className="text-sm text-muted-foreground">sin(π/4)</p>
                  <p className="text-lg">0.7071</p>
                </div>
                
                <div className="p-3 bg-muted rounded-md font-mono">
                  <p className="text-sm text-muted-foreground">(3+4)×2^3</p>
                  <p className="text-lg">56</p>
                </div>
                
                <div className="p-3 bg-muted rounded-md font-mono">
                  <p className="text-sm text-muted-foreground">sqrt(16) + log(100)</p>
                  <p className="text-lg">6.6021</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
