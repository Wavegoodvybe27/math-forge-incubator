
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CircleDot, Compass, Ruler, Triangle } from "lucide-react";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

const axioms = [
  {
    id: "axiom1",
    title: "Axiom 1",
    statement: "A straight line can be drawn from any point to any other point.",
    formula: "\\overline{AB}",
    explanation: "Given any two distinct points A and B, there exists a unique line that passes through them."
  },
  {
    id: "axiom2",
    title: "Axiom 2",
    statement: "A finite straight line can be extended continuously in a straight line.",
    formula: "\\overline{AB} \\subset \\overleftrightarrow{AB}",
    explanation: "Any line segment can be extended indefinitely in both directions."
  },
  {
    id: "axiom3",
    title: "Axiom 3",
    statement: "A circle can be drawn with any center and any radius.",
    formula: "C(O, r) = \\{P : |OP| = r\\}",
    explanation: "Given a point O and a distance r, we can construct a circle with center O and radius r."
  },
  {
    id: "axiom4",
    title: "Axiom 4",
    statement: "All right angles are equal to one another.",
    formula: "\\text{If } \\angle A = 90^{\\circ} \\text{ and } \\angle B = 90^{\\circ}, \\text{ then } \\angle A = \\angle B",
    explanation: "All right angles are congruent, which standardizes angle measurement."
  },
  {
    id: "axiom5",
    title: "Axiom 5 (Parallel Postulate)",
    statement: "If a straight line falling on two straight lines makes the interior angles on the same side less than two right angles, the two straight lines, if extended indefinitely, meet on that side on which the angles are less than two right angles.",
    formula: "\\text{If } \\angle A + \\angle B < 180^{\\circ}, \\text{ then lines intersect}",
    explanation: "This is the famous parallel postulate, which is equivalent to saying that through a point not on a given line, there is exactly one line parallel to the given line."
  }
];

const theorems = [
  {
    id: "pythagorean",
    title: "Pythagorean Theorem",
    statement: "In a right triangle, the square of the length of the hypotenuse equals the sum of the squares of the lengths of the other two sides.",
    formula: "a^2 + b^2 = c^2",
    proof: "\\text{For right triangle } \\triangle ABC \\text{ with right angle at } C:\\\\\\text{Area of square on hypotenuse } = \\text{ Sum of areas of squares on legs}"
  },
  {
    id: "thales",
    title: "Thales' Theorem",
    statement: "If A, B, and C are points on a circle where the line AC is a diameter, then angle ABC is a right angle.",
    formula: "\\text{If } \\overline{AC} \\text{ is a diameter, then } \\angle ABC = 90^{\\circ}",
    proof: "\\text{This follows from the inscribed angle theorem, where } \\angle ABC \\text{ is half the central angle } \\angle AOC = 180^{\\circ}"
  },
  {
    id: "triangle-sum",
    title: "Triangle Angle Sum",
    statement: "The sum of the interior angles of a triangle is 180 degrees (π radians).",
    formula: "\\angle A + \\angle B + \\angle C = 180^{\\circ}",
    proof: "\\text{Using parallel lines and alternate interior angles, this can be proven by extending one side and applying angle properties}"
  }
];

export default function EuclideanGeometryPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Euclidean Geometry"
        description="The classical geometry of flat space based on Euclid's axioms and theorems"
      />
      
      <Tabs defaultValue="axioms" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="axioms">Axioms</TabsTrigger>
          <TabsTrigger value="theorems">Theorems</TabsTrigger>
          <TabsTrigger value="constructions">Constructions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="axioms" className="space-y-6">
          {axioms.map((axiom) => (
            <Card key={axiom.id}>
              <CardHeader className="bg-math-background">
                <CardTitle>{axiom.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="font-medium mb-2">{axiom.statement}</p>
                <div className="bg-math-background p-3 rounded-md mb-3">
                  <BlockMath math={axiom.formula} />
                </div>
                <p className="text-sm text-muted-foreground">{axiom.explanation}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="theorems" className="space-y-6">
          {theorems.map((theorem) => (
            <Card key={theorem.id}>
              <CardHeader className="bg-math-background">
                <CardTitle>{theorem.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="font-medium mb-2">{theorem.statement}</p>
                <div className="bg-math-background p-3 rounded-md mb-3">
                  <BlockMath math={theorem.formula} />
                </div>
                <div className="border-t pt-3 mt-3">
                  <h4 className="text-sm font-medium mb-2">Proof Sketch:</h4>
                  <BlockMath math={theorem.proof} />
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="constructions" className="space-y-6">
          <Card>
            <CardHeader className="bg-math-background">
              <div className="flex items-center gap-2">
                <Compass className="h-5 w-5 text-math-primary" />
                <CardTitle>Basic Constructions with Compass and Straightedge</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="border rounded-md p-3">
                <h3 className="flex items-center gap-2 font-medium mb-2">
                  <Ruler className="h-4 w-4" />
                  Bisecting a Line Segment
                </h3>
                <p className="text-sm mb-2">To find the midpoint of a line segment AB:</p>
                <ol className="text-sm pl-5 list-decimal mb-3">
                  <li>Draw two circles of radius greater than |AB|/2, one centered at A and one at B</li>
                  <li>The circles intersect at two points C and D</li>
                  <li>The line CD intersects AB at the midpoint M</li>
                </ol>
                <p className="text-xs text-muted-foreground">This works because M is equidistant from A and B</p>
              </div>
              
              <div className="border rounded-md p-3">
                <h3 className="flex items-center gap-2 font-medium mb-2">
                  <CircleDot className="h-4 w-4" />
                  Constructing a Perpendicular Bisector
                </h3>
                <p className="text-sm mb-2">To construct a line perpendicular to AB through its midpoint:</p>
                <ol className="text-sm pl-5 list-decimal mb-3">
                  <li>Follow the steps for bisecting a line segment AB to find points C and D</li>
                  <li>The line CD is the perpendicular bisector of AB</li>
                </ol>
                <p className="text-xs text-muted-foreground">This works because the perpendicular bisector is the set of all points equidistant from A and B</p>
              </div>
              
              <div className="border rounded-md p-3">
                <h3 className="flex items-center gap-2 font-medium mb-2">
                  <Triangle className="h-4 w-4" />
                  Constructing an Angle Bisector
                </h3>
                <p className="text-sm mb-2">To bisect an angle ∠AOB:</p>
                <ol className="text-sm pl-5 list-decimal mb-3">
                  <li>Draw a circle with center O</li>
                  <li>Mark points C and D where the circle intersects the angle's sides</li>
                  <li>Draw circles of equal radius centered at C and D</li>
                  <li>The line from O through the intersection of these circles bisects the angle</li>
                </ol>
                <p className="text-xs text-muted-foreground">This works because the angle bisector is the set of all points equidistant from the angle's sides</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
