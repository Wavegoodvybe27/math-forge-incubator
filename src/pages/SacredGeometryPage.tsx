
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Circle, Hexagon, Octagon, Triangle } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

const sacredPatterns = [
  {
    id: "flower-of-life",
    name: "Flower of Life",
    description: "A pattern formed by multiple evenly-spaced, overlapping circles arranged in a flower-like pattern with six-fold symmetry.",
    formula: "r = \\frac{d}{2}",
    formulaDescription: "Where r is radius and d is distance between circle centers",
    icon: Circle
  },
  {
    id: "metatrons-cube",
    name: "Metatron's Cube",
    description: "A complex sacred geometry figure derived from the Flower of Life that contains all 5 Platonic solids.",
    formula: "\\text{Vertices} = 13, \\text{Edges} = 78",
    formulaDescription: "Contains 13 circles connected by 78 lines",
    icon: Octagon
  },
  {
    id: "sri-yantra",
    name: "Sri Yantra",
    description: "A mystical diagram formed by nine interlocking triangles that surround a central point known as a bindu.",
    formula: "9 \\text{ triangles: } 4 \\text{ pointing up, } 5 \\text{ pointing down}",
    formulaDescription: "Creates 43 small triangles arranged in layers",
    icon: Triangle
  },
  {
    id: "vesica-piscis",
    name: "Vesica Piscis",
    description: "The intersection of two circles with the same radius where each circle's center lies on the other's circumference.",
    formula: "A = r^2 \\left( \\pi - \\frac{\\sqrt{3}}{2} \\right)",
    formulaDescription: "Area formula where r is the radius of each circle",
    icon: Circle
  },
  {
    id: "seed-of-life",
    name: "Seed of Life",
    description: "A pattern of seven circles arranged in a six-fold symmetric hexagonal pattern, forming the basis for the Flower of Life.",
    formula: "7 \\text{ circles of equal radius}",
    formulaDescription: "One central circle surrounded by six circles",
    icon: Hexagon
  }
];

export default function SacredGeometryPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Sacred Geometry"
        description="Explore the geometric patterns and mathematical ratios found in nature, art, and architecture"
      />
      
      <Tabs defaultValue="patterns" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="patterns">Sacred Patterns</TabsTrigger>
          <TabsTrigger value="principles">Key Principles</TabsTrigger>
        </TabsList>
        
        <TabsContent value="patterns" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sacredPatterns.map((pattern) => (
              <Card key={pattern.id} className="overflow-hidden">
                <CardHeader className="bg-math-background">
                  <div className="flex items-center gap-2">
                    <pattern.icon className="h-5 w-5 text-math-primary" />
                    <CardTitle>{pattern.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-sm text-muted-foreground mb-4">{pattern.description}</p>
                  <div className="bg-math-background p-3 rounded-md mb-2">
                    <p className="text-xs text-muted-foreground mb-1">Mathematical representation:</p>
                    <BlockMath math={pattern.formula} />
                    <p className="text-xs text-muted-foreground mt-1">{pattern.formulaDescription}</p>
                  </div>
                  <div className="mt-4 bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden">
                    <AspectRatio ratio={1} className="bg-pattern-graph">
                      <div className="flex items-center justify-center h-full">
                        <pattern.icon className="h-24 w-24 text-math-primary opacity-80" />
                      </div>
                    </AspectRatio>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="principles" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Golden Ratio (φ)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">A special number approximately equal to 1.618 that appears repeatedly in sacred geometry.</p>
              <div className="bg-math-background p-3 rounded-md">
                <BlockMath math="\phi = \frac{1 + \sqrt{5}}{2} \approx 1.618033988749895" />
              </div>
              <p className="mt-4 text-sm text-muted-foreground">When a line is divided according to the golden ratio, the ratio of the whole line to the longer segment equals the ratio of the longer segment to the shorter segment.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Divine Proportion</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">The divine proportion is another name for the golden ratio, found throughout nature and considered aesthetically pleasing.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-math-background p-3 rounded-md">
                  <p className="text-xs text-muted-foreground mb-1">In rectangles:</p>
                  <BlockMath math="\frac{a}{b} = \frac{a+b}{a} = \phi" />
                </div>
                <div className="bg-math-background p-3 rounded-md">
                  <p className="text-xs text-muted-foreground mb-1">In spirals:</p>
                  <BlockMath math="r = a e^{b\theta}" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Sacred Numbers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="p-4 bg-math-background rounded-md">
                  <h3 className="font-medium mb-2">Phi (φ): 1.618...</h3>
                  <p className="text-sm text-muted-foreground">The golden ratio</p>
                </div>
                <div className="p-4 bg-math-background rounded-md">
                  <h3 className="font-medium mb-2">Pi (π): 3.14159...</h3>
                  <p className="text-sm text-muted-foreground">Circle's circumference to diameter</p>
                </div>
                <div className="p-4 bg-math-background rounded-md">
                  <h3 className="font-medium mb-2">Sqrt(2): 1.414...</h3>
                  <p className="text-sm text-muted-foreground">Diagonal of a square</p>
                </div>
                <div className="p-4 bg-math-background rounded-md">
                  <h3 className="font-medium mb-2">Sqrt(3): 1.732...</h3>
                  <p className="text-sm text-muted-foreground">Height of an equilateral triangle</p>
                </div>
                <div className="p-4 bg-math-background rounded-md">
                  <h3 className="font-medium mb-2">Sqrt(5): 2.236...</h3>
                  <p className="text-sm text-muted-foreground">Diagonal of a 1×2 rectangle</p>
                </div>
                <div className="p-4 bg-math-background rounded-md">
                  <h3 className="font-medium mb-2">e: 2.718...</h3>
                  <p className="text-sm text-muted-foreground">Base of natural logarithm</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
