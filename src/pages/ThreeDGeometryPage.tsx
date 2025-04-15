import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Box, Square, Cylinder } from "lucide-react";

const BasicShapes = () => {
  const [selectedShape, setSelectedShape] = useState<string>("cube");
  const [color, setColor] = useState<string>("#6366f1");
  const [size, setSize] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <CardHeader className="bg-math-background">
          <CardTitle>3D Shape Visualization</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 h-[400px]">
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Suspense fallback={null}>
              {selectedShape === "cube" && (
                <mesh rotation={[rotation, rotation, 0]}>
                  <boxGeometry args={[size, size, size]} />
                  <meshStandardMaterial color={color} />
                </mesh>
              )}
              {selectedShape === "sphere" && (
                <mesh rotation={[rotation, rotation, 0]}>
                  <sphereGeometry args={[size, 32, 32]} />
                  <meshStandardMaterial color={color} />
                </mesh>
              )}
              {selectedShape === "cylinder" && (
                <mesh rotation={[rotation, rotation, 0]}>
                  <cylinderGeometry args={[size, size, size * 2, 32]} />
                  <meshStandardMaterial color={color} />
                </mesh>
              )}
              {selectedShape === "torus" && (
                <mesh rotation={[rotation, rotation, 0]}>
                  <torusGeometry args={[size, size / 3, 16, 100]} />
                  <meshStandardMaterial color={color} />
                </mesh>
              )}
            </Suspense>
            <OrbitControls />
          </Canvas>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Shape Controls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={() => setSelectedShape("cube")}
              variant={selectedShape === "cube" ? "default" : "outline"}
              className="flex items-center gap-2"
            >
              <Box className="h-4 w-4" />
              Cube
            </Button>
            <Button
              onClick={() => setSelectedShape("sphere")}
              variant={selectedShape === "sphere" ? "default" : "outline"}
              className="flex items-center gap-2"
            >
              <div className="h-4 w-4 rounded-full border-2" />
              Sphere
            </Button>
            <Button
              onClick={() => setSelectedShape("cylinder")}
              variant={selectedShape === "cylinder" ? "default" : "outline"}
              className="flex items-center gap-2"
            >
              <Cylinder className="h-4 w-4" />
              Cylinder
            </Button>
            <Button
              onClick={() => setSelectedShape("torus")}
              variant={selectedShape === "torus" ? "default" : "outline"}
              className="flex items-center gap-2"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="8" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              Torus
            </Button>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Color</p>
            <div className="flex gap-2">
              {["#6366f1", "#8b5cf6", "#ec4899", "#f43f5e", "#f97316", "#eab308"].map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-6 h-6 rounded-full ${
                    color === c ? "ring-2 ring-offset-2 ring-math-primary" : ""
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <p className="text-sm font-medium">Size</p>
              <span className="text-sm text-muted-foreground">{size.toFixed(1)}</span>
            </div>
            <Slider
              value={[size]}
              min={0.5}
              max={3}
              step={0.1}
              onValueChange={(value) => setSize(value[0])}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <p className="text-sm font-medium">Rotation</p>
              <span className="text-sm text-muted-foreground">{Math.round(rotation * 180 / Math.PI)}°</span>
            </div>
            <Slider
              value={[rotation]}
              min={0}
              max={Math.PI * 2}
              step={0.1}
              onValueChange={(value) => setRotation(value[0])}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const Polyhedra = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader className="bg-math-background">
          <CardTitle>Platonic Solids</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 h-[350px]">
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Suspense fallback={null}>
              <group rotation={[0.5, 0.5, 0]}>
                <mesh position={[-1.5, 0, 0]}>
                  <tetrahedronGeometry args={[1]} />
                  <meshStandardMaterial color="#6366f1" />
                </mesh>
                <mesh position={[1.5, 0, 0]}>
                  <octahedronGeometry args={[1]} />
                  <meshStandardMaterial color="#8b5cf6" />
                </mesh>
                <mesh position={[0, 0, 0]}>
                  <icosahedronGeometry args={[1]} />
                  <meshStandardMaterial color="#ec4899" />
                </mesh>
              </group>
            </Suspense>
            <OrbitControls />
          </Canvas>
          <div className="grid grid-cols-3 gap-2 mt-4 text-center text-sm">
            <div>Tetrahedron (4 faces)</div>
            <div>Octahedron (8 faces)</div>
            <div>Icosahedron (20 faces)</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="bg-math-background">
          <CardTitle>Advanced Polyhedra</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 h-[350px]">
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Suspense fallback={null}>
              <group rotation={[0.5, 0.5, 0]}>
                <mesh position={[-1.5, 0, 0]}>
                  <boxGeometry args={[1.5, 1.5, 1.5]} />
                  <meshStandardMaterial color="#f43f5e" wireframe />
                </mesh>
                <mesh position={[1.5, 0, 0]}>
                  <dodecahedronGeometry args={[1]} />
                  <meshStandardMaterial color="#f97316" />
                </mesh>
                <mesh position={[0, 0, 0]}>
                  <torusKnotGeometry args={[0.7, 0.2, 100, 16]} />
                  <meshStandardMaterial color="#eab308" />
                </mesh>
              </group>
            </Suspense>
            <OrbitControls />
          </Canvas>
          <div className="grid grid-cols-3 gap-2 mt-4 text-center text-sm">
            <div>Cube (6 faces)</div>
            <div>Dodecahedron (12 faces)</div>
            <div>Torus Knot</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default function ThreeDGeometryPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="3D Geometry"
        description="Explore three-dimensional shapes, polyhedra, and transformations in space"
      />
      
      <Tabs defaultValue="basics" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="basics">Basic Shapes</TabsTrigger>
          <TabsTrigger value="polyhedra">Polyhedra</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basics" className="space-y-6">
          <BasicShapes />
        </TabsContent>
        
        <TabsContent value="polyhedra" className="space-y-6">
          <Polyhedra />
        </TabsContent>
      </Tabs>
    </div>
  );
}
