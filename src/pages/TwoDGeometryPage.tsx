
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Circle, Square, Triangle, Hexagon, Pentagon } from "lucide-react";
import { InlineMath, BlockMath } from "react-katex";
import TwoDShapeSimulation from "@/components/TwoDShapeSimulation";
import "katex/dist/katex.min.css";

const shapes = [
  {
    id: "triangle",
    name: "Triangle",
    icon: Triangle,
    formulas: [
      { name: "Area", formula: "A = \\frac{1}{2} \\cdot b \\cdot h", description: "b = base, h = height" },
      { name: "Area (Heron's formula)", formula: "A = \\sqrt{s(s-a)(s-b)(s-c)}", description: "s = semiperimeter = (a+b+c)/2" },
      { name: "Perimeter", formula: "P = a + b + c", description: "Sum of all sides" },
      { name: "Sum of interior angles", formula: "\\sum \\text{angles} = 180^{\\circ}", description: "Always constant regardless of triangle shape" }
    ]
  },
  {
    id: "rectangle",
    name: "Rectangle",
    icon: Square,
    formulas: [
      { name: "Area", formula: "A = l \\cdot w", description: "l = length, w = width" },
      { name: "Perimeter", formula: "P = 2l + 2w", description: "Twice the sum of length and width" },
      { name: "Diagonal", formula: "d = \\sqrt{l^2 + w^2}", description: "By Pythagorean theorem" }
    ]
  },
  {
    id: "circle",
    name: "Circle",
    icon: Circle,
    formulas: [
      { name: "Area", formula: "A = \\pi r^2", description: "r = radius" },
      { name: "Circumference", formula: "C = 2\\pi r", description: "r = radius" },
      { name: "Arc Length", formula: "L = r\\theta", description: "θ in radians, r = radius" },
      { name: "Sector Area", formula: "A = \\frac{1}{2}r^2\\theta", description: "θ in radians, r = radius" }
    ]
  },
  {
    id: "regular-polygon",
    name: "Regular Polygon",
    icon: Pentagon,
    formulas: [
      { name: "Area", formula: "A = \\frac{1}{4}ns^2\\cot(\\frac{\\pi}{n})", description: "n = number of sides, s = side length" },
      { name: "Perimeter", formula: "P = ns", description: "n = number of sides, s = side length" },
      { name: "Interior angle", formula: "\\theta = \\frac{(n-2)\\pi}{n}", description: "n = number of sides" },
      { name: "Sum of interior angles", formula: "\\sum \\text{angles} = (n-2)\\pi", description: "n = number of sides" }
    ]
  }
];

const transformations = [
  {
    id: "translation",
    name: "Translation",
    description: "Slides an object without rotating or resizing it",
    formula: "\\begin{pmatrix} x' \\\\ y' \\end{pmatrix} = \\begin{pmatrix} x \\\\ y \\end{pmatrix} + \\begin{pmatrix} t_x \\\\ t_y \\end{pmatrix}",
    example: "Moving (x, y) by tx units horizontally and ty units vertically"
  },
  {
    id: "rotation",
    name: "Rotation",
    description: "Turns an object around a fixed point",
    formula: "\\begin{pmatrix} x' \\\\ y' \\end{pmatrix} = \\begin{pmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{pmatrix} \\begin{pmatrix} x \\\\ y \\end{pmatrix}",
    example: "Rotating (x, y) by θ radians counterclockwise around the origin"
  },
  {
    id: "scaling",
    name: "Scaling",
    description: "Resizes an object",
    formula: "\\begin{pmatrix} x' \\\\ y' \\end{pmatrix} = \\begin{pmatrix} s_x & 0 \\\\ 0 & s_y \\end{pmatrix} \\begin{pmatrix} x \\\\ y \\end{pmatrix}",
    example: "Scaling (x, y) by sx horizontally and sy vertically"
  },
  {
    id: "reflection",
    name: "Reflection",
    description: "Flips an object across a line",
    formula: "\\text{Reflection across x-axis: } \\begin{pmatrix} x' \\\\ y' \\end{pmatrix} = \\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix} \\begin{pmatrix} x \\\\ y \\end{pmatrix}",
    example: "Reflecting (x, y) across the x-axis yields (x, -y)"
  },
  {
    id: "shear",
    name: "Shear",
    description: "Distorts an object along one axis",
    formula: "\\begin{pmatrix} x' \\\\ y' \\end{pmatrix} = \\begin{pmatrix} 1 & k \\\\ 0 & 1 \\end{pmatrix} \\begin{pmatrix} x \\\\ y \\end{pmatrix}",
    example: "Horizontal shear by factor k transforms (x, y) to (x + ky, y)"
  }
];

export default function TwoDGeometryPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="2D Geometry"
        description="Study of shapes, measurements, properties, and transformations in the plane"
      />
      
      <Tabs defaultValue="shapes" className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-6">
          <TabsTrigger value="shapes">Shapes & Formulas</TabsTrigger>
          <TabsTrigger value="transformations">Transformations</TabsTrigger>
          <TabsTrigger value="coordinate">Coordinate Geometry</TabsTrigger>
          <TabsTrigger value="simulation">Shape Simulation</TabsTrigger>
          <TabsTrigger value="non-euclidean">Non-Euclidean</TabsTrigger>
        </TabsList>
        
        <TabsContent value="shapes" className="space-y-6">
          {shapes.map((shape) => (
            <Card key={shape.id}>
              <CardHeader className="bg-math-background">
                <div className="flex items-center gap-2">
                  <shape.icon className="h-5 w-5 text-math-primary" />
                  <CardTitle>{shape.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-4">
                  {shape.formulas.map((formula, index) => (
                    <div key={index} className="border rounded-md p-3">
                      <h3 className="font-medium mb-2">{formula.name}</h3>
                      <div className="bg-math-background p-2 rounded-md mb-2">
                        <BlockMath math={formula.formula} />
                      </div>
                      <p className="text-xs text-muted-foreground">{formula.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="transformations" className="space-y-6">
          {transformations.map((transformation) => (
            <Card key={transformation.id}>
              <CardHeader className="bg-math-background">
                <CardTitle>{transformation.name}</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="mb-3">{transformation.description}</p>
                <div className="bg-math-background p-3 rounded-md mb-3">
                  <BlockMath math={transformation.formula} />
                </div>
                <p className="text-sm text-muted-foreground">{transformation.example}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="coordinate" className="space-y-6">
          <Card>
            <CardHeader className="bg-math-background">
              <CardTitle>Distance Formula</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="mb-3">The distance between two points (x₁, y₁) and (x₂, y₂) in the Cartesian plane:</p>
              <div className="bg-math-background p-3 rounded-md mb-3">
                <BlockMath math="d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}" />
              </div>
              <p className="text-sm text-muted-foreground">This is an application of the Pythagorean theorem in the coordinate plane.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="bg-math-background">
              <CardTitle>Line Equations</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="border rounded-md p-3">
                <h3 className="font-medium mb-2">Slope-Intercept Form</h3>
                <div className="bg-math-background p-2 rounded-md mb-2">
                  <BlockMath math="y = mx + b" />
                </div>
                <p className="text-xs text-muted-foreground">m = slope, b = y-intercept</p>
              </div>
              
              <div className="border rounded-md p-3">
                <h3 className="font-medium mb-2">Point-Slope Form</h3>
                <div className="bg-math-background p-2 rounded-md mb-2">
                  <BlockMath math="y - y_1 = m(x - x_1)" />
                </div>
                <p className="text-xs text-muted-foreground">m = slope, (x₁, y₁) = point on the line</p>
              </div>
              
              <div className="border rounded-md p-3">
                <h3 className="font-medium mb-2">General Form</h3>
                <div className="bg-math-background p-2 rounded-md mb-2">
                  <BlockMath math="Ax + By + C = 0" />
                </div>
                <p className="text-xs text-muted-foreground">A, B, C are constants, A and B not both zero</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="bg-math-background">
              <CardTitle>Conic Sections</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="border rounded-md p-3">
                <h3 className="font-medium mb-2">Circle</h3>
                <div className="bg-math-background p-2 rounded-md mb-2">
                  <BlockMath math="(x - h)^2 + (y - k)^2 = r^2" />
                </div>
                <p className="text-xs text-muted-foreground">Center at (h, k), radius r</p>
              </div>
              
              <div className="border rounded-md p-3">
                <h3 className="font-medium mb-2">Ellipse</h3>
                <div className="bg-math-background p-2 rounded-md mb-2">
                  <BlockMath math="\frac{(x - h)^2}{a^2} + \frac{(y - k)^2}{b^2} = 1" />
                </div>
                <p className="text-xs text-muted-foreground">Center at (h, k), semi-major axis a, semi-minor axis b</p>
              </div>
              
              <div className="border rounded-md p-3">
                <h3 className="font-medium mb-2">Parabola</h3>
                <div className="bg-math-background p-2 rounded-md mb-2">
                  <BlockMath math="(y - k) = a(x - h)^2" />
                </div>
                <p className="text-xs text-muted-foreground">Vertex at (h, k), a determines width and direction</p>
              </div>
              
              <div className="border rounded-md p-3">
                <h3 className="font-medium mb-2">Hyperbola</h3>
                <div className="bg-math-background p-2 rounded-md mb-2">
                  <BlockMath math="\frac{(x - h)^2}{a^2} - \frac{(y - k)^2}{b^2} = 1" />
                </div>
                <p className="text-xs text-muted-foreground">Center at (h, k), transverse axis 2a, conjugate axis 2b</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="simulation" className="space-y-6">
          <TwoDShapeSimulation />
        </TabsContent>
        
        <TabsContent value="non-euclidean" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Hyperbolic Geometry</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-math-background p-4 rounded-lg relative overflow-hidden h-80">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 border-2 border-math-primary rounded-full relative">
                    {/* Poincaré disk model - hyperbolic lines as arcs perpendicular to the boundary */}
                    {Array.from({ length: 12 }).map((_, idx) => (
                      <div key={`line-${idx}`} 
                           className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2"
                           style={{ 
                             transform: `translate(-50%, -50%) rotate(${idx * 15}deg)`,
                           }}>
                        <div className="absolute top-0 left-1/2 w-0.5 h-1/2 bg-math-primary origin-bottom opacity-40"></div>
                      </div>
                    ))}
                    
                    {/* Hyperbolic tessellation */}
                    {Array.from({ length: 5 }).map((_, radiusIdx) => (
                      <div key={`circle-${radiusIdx}`} 
                           className="absolute top-1/2 left-1/2 rounded-full border border-math-primary opacity-30"
                           style={{ 
                             width: `${(radiusIdx + 1) * 20}%`, 
                             height: `${(radiusIdx + 1) * 20}%`,
                             transform: 'translate(-50%, -50%)'
                           }}>
                      </div>
                    ))}
                    
                    <div className="absolute inset-0 flex items-center justify-center text-xs text-math-primary">
                      Poincaré Disk Model
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-sm p-4 border rounded-md">
                <h3 className="font-medium mb-2">Key Properties of Hyperbolic Geometry:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Infinite parallel lines through a point</li>
                  <li>Triangle angle sum less than 180°</li>
                  <li>Defect (180° - angle sum) proportional to area</li>
                  <li>No similar triangles (except congruent ones)</li>
                  <li>Exponential growth of circumference with radius</li>
                </ul>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-md p-3">
                  <h3 className="font-medium mb-2">Hyperbolic Triangle</h3>
                  <div className="bg-math-background p-2 rounded-md mb-2">
                    <BlockMath math="\text{Angle sum: } \alpha + \beta + \gamma < \pi" />
                  </div>
                  <p className="text-xs text-muted-foreground">Triangle angles in hyperbolic space sum to less than 180°</p>
                </div>
                
                <div className="border rounded-md p-3">
                  <h3 className="font-medium mb-2">Hyperbolic Distance</h3>
                  <div className="bg-math-background p-2 rounded-md mb-2">
                    <BlockMath math="d(P,Q) = \ln\frac{|QA||PB|}{|PA||QB|}" />
                  </div>
                  <p className="text-xs text-muted-foreground">Where A and B are ideal points where the geodesic through P and Q meets the boundary</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Elliptic Geometry</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-math-background p-4 rounded-lg relative overflow-hidden h-80">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 rounded-full bg-blue-50 relative shadow-inner">
                    {/* Spherical model visualization */}
                    <div className="absolute w-full h-full rounded-full border-2 border-math-primary opacity-30"></div>
                    
                    {/* Great circles (elliptic "lines") */}
                    {Array.from({ length: 6 }).map((_, idx) => (
                      <div key={`elliptic-line-${idx}`} 
                           className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2"
                           style={{ transform: `translate(-50%, -50%) rotate(${idx * 30}deg)` }}>
                        <div className="absolute top-0 left-1/2 w-0.5 h-full bg-math-primary -translate-x-1/2 opacity-40"></div>
                      </div>
                    ))}
                    
                    {/* Elliptic "latitude" circles */}
                    {Array.from({ length: 4 }).map((_, idx) => (
                      <div key={`latitude-${idx}`}
                           className="absolute top-1/2 left-1/2 rounded-full border border-math-primary opacity-30"
                           style={{ 
                             width: `${75 - idx * 20}%`, 
                             height: `${75 - idx * 20}%`,
                             transform: 'translate(-50%, -50%)'
                           }}>
                      </div>
                    ))}
                    
                    <div className="absolute inset-0 flex items-center justify-center text-xs text-math-primary">
                      Spherical Model
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-sm p-4 border rounded-md">
                <h3 className="font-medium mb-2">Key Properties of Elliptic Geometry:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>No parallel lines (all lines intersect)</li>
                  <li>Triangle angle sum greater than 180°</li>
                  <li>Excess (angle sum - 180°) proportional to area</li>
                  <li>Shortest path is along a great circle (geodesic)</li>
                  <li>Finite total area with no boundary</li>
                </ul>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-md p-3">
                  <h3 className="font-medium mb-2">Elliptic Triangle</h3>
                  <div className="bg-math-background p-2 rounded-md mb-2">
                    <BlockMath math="\text{Angle sum: } \alpha + \beta + \gamma > \pi" />
                  </div>
                  <p className="text-xs text-muted-foreground">Triangle angles in elliptic space sum to more than 180°</p>
                </div>
                
                <div className="border rounded-md p-3">
                  <h3 className="font-medium mb-2">Elliptic Triangle Area</h3>
                  <div className="bg-math-background p-2 rounded-md mb-2">
                    <BlockMath math="A = R^2(\alpha + \beta + \gamma - \pi)" />
                  </div>
                  <p className="text-xs text-muted-foreground">Where R is radius and α, β, γ are the angles</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
