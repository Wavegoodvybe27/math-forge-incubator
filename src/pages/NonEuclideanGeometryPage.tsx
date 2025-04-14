
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, SquareAsterisk, Infinity, ArrowRightCircle } from "lucide-react";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

export default function NonEuclideanGeometryPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Non-Euclidean Geometry"
        description="Geometry based on axioms and postulates that are different from Euclid's five postulates"
      />
      
      <Tabs defaultValue="comparison" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
          <TabsTrigger value="hyperbolic">Hyperbolic</TabsTrigger>
          <TabsTrigger value="elliptic">Elliptic</TabsTrigger>
        </TabsList>
        
        <TabsContent value="comparison" className="space-y-6">
          <Card>
            <CardHeader className="bg-math-background">
              <CardTitle>Parallel Postulate Variations</CardTitle>
              <CardDescription>How the parallel postulate changes across different geometries</CardDescription>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="border rounded-md p-3">
                <h3 className="flex items-center gap-2 font-medium mb-2">
                  <ArrowRightCircle className="h-4 w-4" />
                  Euclidean Geometry
                </h3>
                <p className="text-sm mb-2">Through a point not on a given line, there exists exactly one line parallel to the given line.</p>
                <div className="bg-math-background p-2 rounded-md">
                  <BlockMath math="\text{Number of parallel lines} = 1" />
                </div>
              </div>
              
              <div className="border rounded-md p-3">
                <h3 className="flex items-center gap-2 font-medium mb-2">
                  <Infinity className="h-4 w-4" />
                  Hyperbolic Geometry
                </h3>
                <p className="text-sm mb-2">Through a point not on a given line, there are infinitely many lines parallel to the given line.</p>
                <div className="bg-math-background p-2 rounded-md">
                  <BlockMath math="\text{Number of parallel lines} = \infty" />
                </div>
              </div>
              
              <div className="border rounded-md p-3">
                <h3 className="flex items-center gap-2 font-medium mb-2">
                  <Globe className="h-4 w-4" />
                  Elliptic Geometry
                </h3>
                <p className="text-sm mb-2">Through a point not on a given line, there are no lines parallel to the given line.</p>
                <div className="bg-math-background p-2 rounded-md">
                  <BlockMath math="\text{Number of parallel lines} = 0" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="bg-math-background">
              <CardTitle>Triangle Angle Sum</CardTitle>
              <CardDescription>How the sum of angles in a triangle varies by geometry type</CardDescription>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-md p-3">
                  <h3 className="font-medium mb-2 text-center">Euclidean</h3>
                  <div className="bg-math-background p-2 rounded-md mb-2">
                    <BlockMath math="\sum \text{angles} = 180^{\circ}" />
                  </div>
                  <p className="text-xs text-muted-foreground text-center">Always exactly 180°</p>
                </div>
                
                <div className="border rounded-md p-3">
                  <h3 className="font-medium mb-2 text-center">Hyperbolic</h3>
                  <div className="bg-math-background p-2 rounded-md mb-2">
                    <BlockMath math="\sum \text{angles} < 180^{\circ}" />
                  </div>
                  <p className="text-xs text-muted-foreground text-center">Always less than 180°</p>
                </div>
                
                <div className="border rounded-md p-3">
                  <h3 className="font-medium mb-2 text-center">Elliptic</h3>
                  <div className="bg-math-background p-2 rounded-md mb-2">
                    <BlockMath math="\sum \text{angles} > 180^{\circ}" />
                  </div>
                  <p className="text-xs text-muted-foreground text-center">Always greater than 180°</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="bg-math-background">
              <CardTitle>Surface Curvature</CardTitle>
              <CardDescription>Geometric interpretation of curvature in different geometries</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-20 w-20 rounded-md bg-math-background flex items-center justify-center mb-3">
                    <ArrowRightCircle className="h-10 w-10 text-math-primary" />
                  </div>
                  <h3 className="font-medium mb-1">Euclidean</h3>
                  <p className="text-sm mb-1">Flat surface</p>
                  <div className="bg-math-background px-2 py-1 rounded-md">
                    <InlineMath math="K = 0" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Zero Gaussian curvature</p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="h-20 w-20 rounded-md bg-math-background flex items-center justify-center mb-3">
                    <Infinity className="h-10 w-10 text-math-primary" />
                  </div>
                  <h3 className="font-medium mb-1">Hyperbolic</h3>
                  <p className="text-sm mb-1">Saddle-shaped surface</p>
                  <div className="bg-math-background px-2 py-1 rounded-md">
                    <InlineMath math="K < 0" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Negative Gaussian curvature</p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="h-20 w-20 rounded-md bg-math-background flex items-center justify-center mb-3">
                    <Globe className="h-10 w-10 text-math-primary" />
                  </div>
                  <h3 className="font-medium mb-1">Elliptic</h3>
                  <p className="text-sm mb-1">Sphere-like surface</p>
                  <div className="bg-math-background px-2 py-1 rounded-md">
                    <InlineMath math="K > 0" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Positive Gaussian curvature</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="hyperbolic" className="space-y-6">
          <Card>
            <CardHeader className="bg-math-background">
              <div className="flex items-center gap-2">
                <Infinity className="h-5 w-5 text-math-primary" />
                <CardTitle>Hyperbolic Geometry</CardTitle>
              </div>
              <CardDescription>Geometry with negative curvature</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="mb-4">Hyperbolic geometry is a non-Euclidean geometry where the parallel postulate is replaced with:</p>
              <div className="bg-math-background p-3 rounded-md mb-4">
                <BlockMath math="\text{Through a point not on a line, there exist at least two distinct lines parallel to the given line.}" />
              </div>
              <p className="text-sm mb-4">In fact, there are infinitely many such parallel lines in hyperbolic geometry.</p>
              
              <div className="border-t pt-4 mt-4">
                <h3 className="font-medium mb-3">Key Properties</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-math-primary mt-1">•</span>
                    <span>Triangle angle sum is less than 180° and depends on the triangle's area</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-math-primary mt-1">•</span>
                    <span>The defect of a triangle (180° minus the angle sum) is proportional to its area</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-math-primary mt-1">•</span>
                    <span>Similar triangles must be congruent (no scaling without distortion)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-math-primary mt-1">•</span>
                    <span>The circumference of a circle grows exponentially with its radius</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Models of Hyperbolic Geometry</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-md p-3">
                <h3 className="font-medium mb-2">Poincaré Disk Model</h3>
                <p className="text-sm mb-2">Represents the entire hyperbolic plane as the interior of a circular disk.</p>
                <ul className="text-sm space-y-1 mb-2">
                  <li>• "Lines" are arcs of circles perpendicular to the boundary</li>
                  <li>• Angles are preserved (conformal model)</li>
                  <li>• Distances are increasingly distorted toward the boundary</li>
                </ul>
                <div className="bg-math-background p-2 rounded-md">
                  <BlockMath math="\text{Distance formula: } ds^2 = \frac{4(dx^2 + dy^2)}{(1 - (x^2 + y^2))^2}" />
                </div>
              </div>
              
              <div className="border rounded-md p-3">
                <h3 className="font-medium mb-2">Klein Model</h3>
                <p className="text-sm mb-2">Represents the hyperbolic plane as the interior of a circular disk.</p>
                <ul className="text-sm space-y-1 mb-2">
                  <li>• "Lines" are straight line segments</li>
                  <li>• Angles are not preserved (not conformal)</li>
                  <li>• Useful for studying hyperbolic lines</li>
                </ul>
                <div className="bg-math-background p-2 rounded-md">
                  <BlockMath math="\text{Distance formula is complex and involves cross-ratios}" />
                </div>
              </div>
              
              <div className="border rounded-md p-3">
                <h3 className="font-medium mb-2">Hyperboloid Model</h3>
                <p className="text-sm mb-2">Represents hyperbolic space using a hyperboloid in Minkowski space.</p>
                <ul className="text-sm space-y-1 mb-2">
                  <li>• Used in relativity theory</li>
                  <li>• "Lines" are intersections of the hyperboloid with planes through the origin</li>
                  <li>• Preserves hyperbolic structure naturally</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="elliptic" className="space-y-6">
          <Card>
            <CardHeader className="bg-math-background">
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-math-primary" />
                <CardTitle>Elliptic Geometry</CardTitle>
              </div>
              <CardDescription>Geometry with positive curvature</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="mb-4">Elliptic geometry is a non-Euclidean geometry where the parallel postulate is replaced with:</p>
              <div className="bg-math-background p-3 rounded-md mb-4">
                <BlockMath math="\text{Through a point not on a line, there exist no lines parallel to the given line.}" />
              </div>
              <p className="text-sm mb-4">In elliptic geometry, any two lines always intersect at some point.</p>
              
              <div className="border-t pt-4 mt-4">
                <h3 className="font-medium mb-3">Key Properties</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-math-primary mt-1">•</span>
                    <span>Triangle angle sum is greater than 180° and depends on the triangle's area</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-math-primary mt-1">•</span>
                    <span>The excess of a triangle (angle sum minus 180°) is proportional to its area</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-math-primary mt-1">•</span>
                    <span>The shortest path between two points is along a great circle (geodesic)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-math-primary mt-1">•</span>
                    <span>The circumference of a circle is less than 2πr and approaches zero as r approaches π</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Models of Elliptic Geometry</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-md p-3">
                <h3 className="font-medium mb-2">Spherical Model</h3>
                <p className="text-sm mb-2">The surface of a sphere is the most intuitive model of elliptic geometry.</p>
                <ul className="text-sm space-y-1 mb-2">
                  <li>• "Lines" are great circles (circles with the same center as the sphere)</li>
                  <li>• Any two great circles intersect at exactly two antipodal points</li>
                  <li>• The sum of angles in a triangle exceeds 180°</li>
                </ul>
                <div className="bg-math-background p-2 rounded-md">
                  <BlockMath math="\text{Area of a triangle: } A = R^2(\\alpha + \\beta + \\gamma - \\pi)" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">Where R is the sphere radius and α, β, γ are the angles</p>
              </div>
              
              <div className="border rounded-md p-3">
                <h3 className="font-medium mb-2">Projective Model</h3>
                <p className="text-sm mb-2">Real projective plane as a model of elliptic geometry.</p>
                <ul className="text-sm space-y-1 mb-2">
                  <li>• Identifies antipodal points on the sphere</li>
                  <li>• Any two distinct lines intersect at exactly one point</li>
                  <li>• Useful for studying projective properties</li>
                </ul>
              </div>
              
              <div className="border rounded-md p-3">
                <h3 className="font-medium mb-2">Applications</h3>
                <p className="text-sm mb-2">Elliptic geometry has important applications in:</p>
                <ul className="text-sm space-y-1">
                  <li>• Navigation on the Earth's surface</li>
                  <li>• Astronomy and celestial mechanics</li>
                  <li>• General relativity (in describing curved spacetime)</li>
                  <li>• Computer graphics (for spherical mapping)</li>
                </ul>
              </div>
              
              <div className="bg-math-background p-3 rounded-md mt-2">
                <h3 className="font-medium mb-2 text-center">Gauss-Bonnet Theorem</h3>
                <BlockMath math="\int_M K dA + \int_{\partial M} k_g ds = 2\pi\chi(M)" />
                <p className="text-xs text-center text-muted-foreground mt-1">Relates the geometry of a surface (curvature K) to its topology (Euler characteristic χ)</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
