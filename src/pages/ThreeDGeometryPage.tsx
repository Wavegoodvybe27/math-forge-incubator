import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense, useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Box, Square, Cylinder } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const BasicShapes = () => {
  const [selectedShape, setSelectedShape] = useState<string>("cube");
  const [color, setColor] = useState<string>("#6366f1");
  const [size, setSize] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [segments, setSegments] = useState<number>(32);
  const [wireframe, setWireframe] = useState<boolean>(false);
  
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
                  <meshStandardMaterial color={color} wireframe={wireframe} />
                </mesh>
              )}
              {selectedShape === "sphere" && (
                <mesh rotation={[rotation, rotation, 0]}>
                  <sphereGeometry args={[size, segments, segments]} />
                  <meshStandardMaterial color={color} wireframe={wireframe} />
                </mesh>
              )}
              {selectedShape === "cylinder" && (
                <mesh rotation={[rotation, rotation, 0]}>
                  <cylinderGeometry args={[size, size, size * 2, segments]} />
                  <meshStandardMaterial color={color} wireframe={wireframe} />
                </mesh>
              )}
              {selectedShape === "torus" && (
                <mesh rotation={[rotation, rotation, 0]}>
                  <torusGeometry args={[size, size / 3, 16, segments]} />
                  <meshStandardMaterial color={color} wireframe={wireframe} />
                </mesh>
              )}
              {selectedShape === "cone" && (
                <mesh rotation={[rotation, rotation, 0]}>
                  <coneGeometry args={[size, size * 2, segments]} />
                  <meshStandardMaterial color={color} wireframe={wireframe} />
                </mesh>
              )}
              {selectedShape === "torusKnot" && (
                <mesh rotation={[rotation, rotation, 0]}>
                  <torusKnotGeometry args={[size, size / 3, 100, segments]} />
                  <meshStandardMaterial color={color} wireframe={wireframe} />
                </mesh>
              )}
            </Suspense>
            <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
          </Canvas>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Shape Controls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
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
              onClick={() => setSelectedShape("cone")}
              variant={selectedShape === "cone" ? "default" : "outline"}
              className="flex items-center gap-2"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L3 19h18L12 2z" />
              </svg>
              Cone
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
            <Button
              onClick={() => setSelectedShape("torusKnot")}
              variant={selectedShape === "torusKnot" ? "default" : "outline"}
              className="flex items-center gap-2"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 3c-1.5 0-2.5 1-2.5 2.5S10.5 8 12 8s2.5-1 2.5-2.5S13.5 3 12 3z" />
                <path d="M12 8c-1.5 0-2.5 1-2.5 2.5S10.5 13 12 13s2.5-1 2.5-2.5S13.5 8 12 8z" />
                <path d="M12 13c-1.5 0-2.5 1-2.5 2.5S10.5 18 12 18s2.5-1 2.5-2.5S13.5 13 12 13z" />
                <path d="M12 18c-1.5 0-2.5 1-2.5 2.5S10.5 23 12 23s2.5-1 2.5-2.5S13.5 18 12 18z" />
              </svg>
              Knot
            </Button>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Color</p>
            <div className="flex flex-wrap gap-2">
              {["#6366f1", "#8b5cf6", "#ec4899", "#f43f5e", "#f97316", "#eab308", "#84cc16", "#10b981", "#14b8a6", "#06b6d4", "#0ea5e9", "#3b82f6"].map((c) => (
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

          <div className="space-y-2">
            <div className="flex justify-between">
              <p className="text-sm font-medium">Segments</p>
              <span className="text-sm text-muted-foreground">{segments}</span>
            </div>
            <Slider
              value={[segments]}
              min={3}
              max={64}
              step={1}
              onValueChange={(value) => setSegments(value[0])}
            />
          </div>

          <div className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              id="wireframe" 
              checked={wireframe} 
              onChange={(e) => setWireframe(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-math-primary focus:ring-math-primary" 
            />
            <label htmlFor="wireframe" className="text-sm font-medium">
              Wireframe Mode
            </label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const Polyhedra = () => {
  const [selectedSet, setSelectedSet] = useState<string>("platonic");
  const [wireframe, setWireframe] = useState<boolean>(false);
  const [rotationSpeed, setRotationSpeed] = useState<number>(0.5);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-2">
          <label htmlFor="polyhedra-set" className="text-sm font-medium">
            Polyhedra Set:
          </label>
          <Select value={selectedSet} onValueChange={setSelectedSet}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a set" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="platonic">Platonic Solids</SelectItem>
              <SelectItem value="archimedean">Archimedean Solids</SelectItem>
              <SelectItem value="prisms">Prisms & Antiprisms</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              id="polyhedra-wireframe" 
              checked={wireframe} 
              onChange={(e) => setWireframe(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-math-primary focus:ring-math-primary" 
            />
            <label htmlFor="polyhedra-wireframe" className="text-sm font-medium">
              Wireframe
            </label>
          </div>
          
          <div className="flex items-center gap-2">
            <label htmlFor="rotation-speed" className="text-sm font-medium">
              Rotation:
            </label>
            <Slider
              id="rotation-speed"
              value={[rotationSpeed]}
              min={0}
              max={2}
              step={0.1}
              className="w-[100px]"
              onValueChange={(value) => setRotationSpeed(value[0])}
            />
          </div>
        </div>
      </div>
      
      <Card>
        <CardHeader className="bg-math-background">
          <CardTitle>
            {selectedSet === "platonic" && "Platonic Solids (Regular Polyhedra)"}
            {selectedSet === "archimedean" && "Archimedean Solids"}
            {selectedSet === "prisms" && "Prisms & Antiprisms"}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4 h-[500px]">
          <Canvas camera={{ position: [0, 0, 12], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Suspense fallback={null}>
              {selectedSet === "platonic" && (
                <group>
                  <AnimatedPolyhedron 
                    position={[-4.5, 2, 0]} 
                    geometry="tetrahedron" 
                    color="#6366f1" 
                    size={1.2} 
                    wireframe={wireframe} 
                    rotationSpeed={rotationSpeed} 
                  />
                  <AnimatedPolyhedron 
                    position={[0, 2, 0]} 
                    geometry="octahedron" 
                    color="#8b5cf6" 
                    size={1.2} 
                    wireframe={wireframe} 
                    rotationSpeed={rotationSpeed} 
                  />
                  <AnimatedPolyhedron 
                    position={[4.5, 2, 0]} 
                    geometry="icosahedron" 
                    color="#ec4899" 
                    size={1.2} 
                    wireframe={wireframe} 
                    rotationSpeed={rotationSpeed} 
                  />
                  <AnimatedPolyhedron 
                    position={[-2.25, -2, 0]} 
                    geometry="dodecahedron" 
                    color="#f97316" 
                    size={1.2} 
                    wireframe={wireframe} 
                    rotationSpeed={rotationSpeed} 
                  />
                  <AnimatedPolyhedron 
                    position={[2.25, -2, 0]} 
                    geometry="box" 
                    color="#eab308" 
                    size={1.2} 
                    wireframe={wireframe} 
                    rotationSpeed={rotationSpeed} 
                  />
                </group>
              )}
              
              {selectedSet === "archimedean" && (
                <group>
                  <AnimatedPolyhedron 
                    position={[-4.5, 1.5, 0]} 
                    geometry="truncatedTetrahedron" 
                    color="#84cc16" 
                    size={1.2} 
                    wireframe={wireframe} 
                    rotationSpeed={rotationSpeed} 
                  />
                  <AnimatedPolyhedron 
                    position={[0, 1.5, 0]} 
                    geometry="truncatedOctahedron" 
                    color="#10b981" 
                    size={1.2} 
                    wireframe={wireframe} 
                    rotationSpeed={rotationSpeed} 
                  />
                  <AnimatedPolyhedron 
                    position={[4.5, 1.5, 0]} 
                    geometry="truncatedIcosahedron" 
                    color="#14b8a6" 
                    size={1.2} 
                    wireframe={wireframe} 
                    rotationSpeed={rotationSpeed} 
                  />
                  <AnimatedPolyhedron 
                    position={[-2.25, -1.5, 0]} 
                    geometry="cuboctahedron" 
                    color="#06b6d4" 
                    size={1.2} 
                    wireframe={wireframe} 
                    rotationSpeed={rotationSpeed} 
                  />
                  <AnimatedPolyhedron 
                    position={[2.25, -1.5, 0]} 
                    geometry="icosidodecahedron" 
                    color="#0ea5e9" 
                    size={1.2} 
                    wireframe={wireframe} 
                    rotationSpeed={rotationSpeed} 
                  />
                </group>
              )}
              
              {selectedSet === "prisms" && (
                <group>
                  <AnimatedPolyhedron 
                    position={[-4.5, 1.5, 0]} 
                    geometry="triangularPrism" 
                    color="#3b82f6" 
                    size={1.2} 
                    wireframe={wireframe} 
                    rotationSpeed={rotationSpeed} 
                  />
                  <AnimatedPolyhedron 
                    position={[0, 1.5, 0]} 
                    geometry="pentagonalPrism" 
                    color="#a855f7" 
                    size={1.2} 
                    wireframe={wireframe} 
                    rotationSpeed={rotationSpeed} 
                  />
                  <AnimatedPolyhedron 
                    position={[4.5, 1.5, 0]} 
                    geometry="hexagonalPrism" 
                    color="#d946ef" 
                    size={1.2} 
                    wireframe={wireframe} 
                    rotationSpeed={rotationSpeed} 
                  />
                  <AnimatedPolyhedron 
                    position={[-2.25, -1.5, 0]} 
                    geometry="triangularAntiprism" 
                    color="#f43f5e" 
                    size={1.2} 
                    wireframe={wireframe} 
                    rotationSpeed={rotationSpeed} 
                  />
                  <AnimatedPolyhedron 
                    position={[2.25, -1.5, 0]} 
                    geometry="squareAntiprism" 
                    color="#ef4444" 
                    size={1.2} 
                    wireframe={wireframe} 
                    rotationSpeed={rotationSpeed} 
                  />
                </group>
              )}
            </Suspense>
            <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
          </Canvas>
        </CardContent>
        
        <div className="px-6 pb-6 grid grid-cols-2 md:grid-cols-5 gap-3 text-center text-xs sm:text-sm">
          {selectedSet === "platonic" && (
            <>
              <div>Tetrahedron<br/>(4 faces)</div>
              <div>Octahedron<br/>(8 faces)</div>
              <div>Icosahedron<br/>(20 faces)</div>
              <div>Dodecahedron<br/>(12 faces)</div>
              <div>Cube<br/>(6 faces)</div>
            </>
          )}
          
          {selectedSet === "archimedean" && (
            <>
              <div>Truncated<br/>Tetrahedron</div>
              <div>Truncated<br/>Octahedron</div>
              <div>Truncated<br/>Icosahedron</div>
              <div>Cuboctahedron</div>
              <div>Icosidodecahedron</div>
            </>
          )}
          
          {selectedSet === "prisms" && (
            <>
              <div>Triangular<br/>Prism</div>
              <div>Pentagonal<br/>Prism</div>
              <div>Hexagonal<br/>Prism</div>
              <div>Triangular<br/>Antiprism</div>
              <div>Square<br/>Antiprism</div>
            </>
          )}
        </div>
      </Card>
    </div>
  );
};

const AnimatedPolyhedron = ({ 
  position, 
  geometry, 
  color, 
  size = 1, 
  wireframe = false, 
  rotationSpeed = 0.5 
}) => {
  const meshRef = useRef();
  
  useEffect(() => {
    if (!meshRef.current) return;
    
    const animate = () => {
      if (meshRef.current) {
        meshRef.current.rotation.x += 0.003 * rotationSpeed;
        meshRef.current.rotation.y += 0.005 * rotationSpeed;
      }
      requestAnimationFrame(animate);
    };
    
    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [rotationSpeed]);
  
  const getGeometry = () => {
    switch (geometry) {
      case "tetrahedron":
        return <tetrahedronGeometry args={[size, 0]} />;
      case "octahedron":
        return <octahedronGeometry args={[size, 0]} />;
      case "icosahedron":
        return <icosahedronGeometry args={[size, 0]} />;
      case "dodecahedron":
        return <dodecahedronGeometry args={[size, 0]} />;
      case "box":
        return <boxGeometry args={[size, size, size]} />;
      case "truncatedTetrahedron":
        return <sphereGeometry args={[size, 32, 16]} />;
      case "truncatedOctahedron":
        return <sphereGeometry args={[size, 32, 16]} />;
      case "truncatedIcosahedron":
        return <sphereGeometry args={[size, 32, 16]} />;
      case "cuboctahedron":
        return <sphereGeometry args={[size, 32, 16]} />;
      case "icosidodecahedron":
        return <sphereGeometry args={[size, 32, 16]} />;
      case "triangularPrism":
        return <cylinderGeometry args={[size, size, size * 2, 3]} />;
      case "pentagonalPrism":
        return <cylinderGeometry args={[size, size, size * 2, 5]} />;
      case "hexagonalPrism":
        return <cylinderGeometry args={[size, size, size * 2, 6]} />;
      case "triangularAntiprism":
        return <cylinderGeometry args={[size, size * 0.8, size * 1.5, 3]} />;
      case "squareAntiprism":
        return <cylinderGeometry args={[size, size * 0.8, size * 1.5, 4]} />;
      default:
        return <sphereGeometry args={[size, 32, 16]} />;
    }
  };
  
  return (
    <mesh ref={meshRef} position={position}>
      {getGeometry()}
      <meshStandardMaterial color={color} wireframe={wireframe} />
    </mesh>
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
