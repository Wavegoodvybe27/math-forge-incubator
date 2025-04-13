
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Function, LineChart, FileText, Calculator, Brain } from "lucide-react";
import { Link } from "react-router-dom";
import { EquationEditor } from "@/components/EquationEditor";

export default function Dashboard() {
  const featuredEquation = "f(x) = \\sum_{n=0}^{\\infty} \\frac{x^n}{n!}";

  return (
    <div className="space-y-6">
      <PageHeader
        title="Math Forge"
        description="Develop and explore your mathematical framework"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Welcome to Math Forge</CardTitle>
            <CardDescription>A tool for mathematical framework development</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Math Forge helps you build, explore, and document mathematical frameworks.
              Use the tools to create equations, plot functions, take notes, and calculate results.
            </p>
            
            <div className="bg-math-background p-4 rounded-lg">
              <EquationEditor initialValue={featuredEquation} />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Link to="/equation-editor">
                <Button>
                  <Function className="mr-2 h-4 w-4" />
                  Start with Equations
                </Button>
              </Link>
              <Link to="/function-plotter">
                <Button variant="outline">
                  <LineChart className="mr-2 h-4 w-4" />
                  Plot Functions
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Link to="/equation-editor" className="w-full">
                <Button variant="outline" className="w-full justify-start">
                  <Function className="mr-2 h-5 w-5 text-math-primary" />
                  Equation Editor
                </Button>
              </Link>
              <Link to="/function-plotter" className="w-full">
                <Button variant="outline" className="w-full justify-start">
                  <LineChart className="mr-2 h-5 w-5 text-math-primary" />
                  Function Plotter
                </Button>
              </Link>
              <Link to="/notes" className="w-full">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-5 w-5 text-math-primary" />
                  Notes
                </Button>
              </Link>
              <Link to="/calculator" className="w-full">
                <Button variant="outline" className="w-full justify-start">
                  <Calculator className="mr-2 h-5 w-5 text-math-primary" />
                  Calculator
                </Button>
              </Link>
              <Link to="/documentation" className="w-full">
                <Button variant="outline" className="w-full justify-start">
                  <Brain className="mr-2 h-5 w-5 text-math-primary" />
                  Documentation
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Recent Equations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="p-3 rounded-md bg-math-background">
                <EquationEditor initialValue="E = mc^2" />
              </div>
              <div className="p-3 rounded-md bg-math-background">
                <EquationEditor initialValue="\nabla \times \vec{E} = -\frac{\partial \vec{B}}{\partial t}" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Begin by creating equations in the Equation Editor, 
              visualize them with the Function Plotter, and document your findings in Notes.
            </p>
            <p>
              Use the Calculator for quick computations and check the Documentation
              for guidance on using Math Forge effectively.
            </p>
            <Link to="/documentation">
              <Button variant="secondary" className="w-full">
                Read Documentation
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
