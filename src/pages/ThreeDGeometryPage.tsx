
import React, { useState, useRef, useEffect } from 'react';
import { PageHeader } from "@/components/PageHeader";
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

// Basic shapes section
const Box = ({ position = [0, 0, 0], color = 'orange', scale = 1 }) => {
  return (
    <mesh position={position}>
      <boxGeometry args={[scale, scale, scale]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const Sphere = ({ position = [0, 0, 0], color = 'royalblue', scale = 1 }) => {
  return (
    <mesh position={position}>
      <sphereGeometry args={[scale * 0.5, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const Cylinder = ({ position = [0, 0, 0], color = 'green', scale = 1 }) => {
  return (
    <mesh position={position}>
      <cylinderGeometry args={[scale * 0.5, scale * 0.5, scale, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const Cone = ({ position = [0, 0, 0], color = 'red', scale = 1 }) => {
  return (
    <mesh position={position}>
      <coneGeometry args={[scale * 0.5, scale, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const Torus = ({ position = [0, 0, 0], color = 'purple', scale = 1 }) => {
  return (
    <mesh position={position}>
      <torusGeometry args={[scale * 0.5, scale * 0.2, 16, 100]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

// Polyhedra section
const Tetrahedron = ({ position = [0, 0, 0], color = '#FF5733', scale = 1 }) => {
  return (
    <mesh position={position}>
      <tetrahedronGeometry args={[scale * 0.6, 0]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const Octahedron = ({ position = [0, 0, 0], color = '#33FF57', scale = 1 }) => {
  return (
    <mesh position={position}>
      <octahedronGeometry args={[scale * 0.6, 0]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const Dodecahedron = ({ position = [0, 0, 0], color = '#5733FF', scale = 1 }) => {
  return (
    <mesh position={position}>
      <dodecahedronGeometry args={[scale * 0.6, 0]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const Icosahedron = ({ position = [0, 0, 0], color = '#FFFF33', scale = 1 }) => {
  return (
    <mesh position={position}>
      <icosahedronGeometry args={[scale * 0.6, 0]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

// Animation component for polyhedra
const AnimatedPolyhedron = ({ geometry, position = [0, 0, 0], color = '#FF5733', scale = 1 }) => {
  // Fix the type error by properly typing meshRef
  const meshRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (!meshRef.current) return;
    
    const animate = () => {
      if (meshRef.current) {
        meshRef.current.rotation.x += 0.01;
        meshRef.current.rotation.y += 0.01;
      }
      requestAnimationFrame(animate);
    };
    
    const animationId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <mesh ref={meshRef} position={position}>
      {geometry === 'tetrahedron' && <tetrahedronGeometry args={[scale * 0.6, 0]} />}
      {geometry === 'octahedron' && <octahedronGeometry args={[scale * 0.6, 0]} />}
      {geometry === 'dodecahedron' && <dodecahedronGeometry args={[scale * 0.6, 0]} />}
      {geometry === 'icosahedron' && <icosahedronGeometry args={[scale * 0.6, 0]} />}
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

// Scene setup component
const Scene = ({ children }) => {
  return (
    <Canvas style={{ height: '400px', width: '100%' }} camera={{ position: [0, 0, 5], fov: 75 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <OrbitControls />
      {children}
    </Canvas>
  );
};

// Main component
export default function ThreeDGeometryPage() {
  const [currentTab, setCurrentTab] = useState('basic');
  const [basicShape, setBasicShape] = useState('cube');
  const [polyhedronType, setPolyhedronType] = useState('platonic');
  const [platonicShape, setPlatonicShape] = useState('tetrahedron');
  const [archimedeanShape, setArchimedeanShape] = useState('truncated-tetrahedron');
  const [stellatedShape, setStellatedShape] = useState('stellated-octahedron');

  // Define the shapes for the current view
  const renderBasicShapes = () => (
    <>
      {basicShape === 'cube' && <Box position={[0, 0, 0]} />}
      {basicShape === 'sphere' && <Sphere position={[0, 0, 0]} />}
      {basicShape === 'cylinder' && <Cylinder position={[0, 0, 0]} />}
      {basicShape === 'cone' && <Cone position={[0, 0, 0]} />}
      {basicShape === 'torus' && <Torus position={[0, 0, 0]} />}
    </>
  );

  const renderPlatonicPolyhedra = () => (
    <>
      {platonicShape === 'tetrahedron' && <AnimatedPolyhedron geometry="tetrahedron" position={[0, 0, 0]} color="#FF5733" />}
      {platonicShape === 'octahedron' && <AnimatedPolyhedron geometry="octahedron" position={[0, 0, 0]} color="#33FF57" />}
      {platonicShape === 'dodecahedron' && <AnimatedPolyhedron geometry="dodecahedron" position={[0, 0, 0]} color="#5733FF" />}
      {platonicShape === 'icosahedron' && <AnimatedPolyhedron geometry="icosahedron" position={[0, 0, 0]} color="#FFFF33" />}
    </>
  );

  // Note: These shapes are placeholders as THREE.js doesn't have built-in archimedean and stellated polyhedra
  // In a real application, these would be custom geometries or imported models
  const renderArchimedeanPolyhedra = () => (
    <>
      <Octahedron position={[0, 0, 0]} color="#33C4FF" />
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.8, 4, 2]} />
        <meshStandardMaterial color="#33C4FF" wireframe />
      </mesh>
    </>
  );

  const renderStellatedPolyhedra = () => (
    <>
      <mesh position={[0, 0, 0]}>
        <octahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial color="#FF33A8" />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#FF33A8" wireframe opacity={0.5} transparent />
      </mesh>
    </>
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="3D Geometry Explorer"
        description="Explore three-dimensional shapes and their properties"
      />
      
      <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="basic">Basic Shapes</TabsTrigger>
          <TabsTrigger value="polyhedra">Polyhedra</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Basic 3D Shapes</CardTitle>
              <CardDescription>
                Explore fundamental three-dimensional shapes like cubes, spheres, and cylinders
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Select value={basicShape} onValueChange={setBasicShape}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a shape" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cube">Cube</SelectItem>
                    <SelectItem value="sphere">Sphere</SelectItem>
                    <SelectItem value="cylinder">Cylinder</SelectItem>
                    <SelectItem value="cone">Cone</SelectItem>
                    <SelectItem value="torus">Torus</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Scene>
                {renderBasicShapes()}
              </Scene>
            </CardContent>
            <CardFooter>
              <div className="text-sm text-muted-foreground">
                Interact with the 3D model: click and drag to rotate, scroll to zoom
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="polyhedra" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Polyhedra Explorer</CardTitle>
              <CardDescription>
                Discover the beautiful world of polyhedra - solids with flat faces and straight edges
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 space-y-4">
                <Select value={polyhedronType} onValueChange={setPolyhedronType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select polyhedron type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="platonic">Platonic Solids</SelectItem>
                    <SelectItem value="archimedean">Archimedean Solids</SelectItem>
                    <SelectItem value="stellated">Stellated Polyhedra</SelectItem>
                  </SelectContent>
                </Select>
                
                {polyhedronType === 'platonic' && (
                  <Select value={platonicShape} onValueChange={setPlatonicShape}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a platonic solid" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tetrahedron">Tetrahedron</SelectItem>
                      <SelectItem value="octahedron">Octahedron</SelectItem>
                      <SelectItem value="dodecahedron">Dodecahedron</SelectItem>
                      <SelectItem value="icosahedron">Icosahedron</SelectItem>
                    </SelectContent>
                  </Select>
                )}
                
                {polyhedronType === 'archimedean' && (
                  <Select value={archimedeanShape} onValueChange={setArchimedeanShape}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an archimedean solid" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="truncated-tetrahedron">Truncated Tetrahedron</SelectItem>
                      <SelectItem value="cuboctahedron">Cuboctahedron</SelectItem>
                      <SelectItem value="truncated-octahedron">Truncated Octahedron</SelectItem>
                      <SelectItem value="rhombicuboctahedron">Rhombicuboctahedron</SelectItem>
                    </SelectContent>
                  </Select>
                )}
                
                {polyhedronType === 'stellated' && (
                  <Select value={stellatedShape} onValueChange={setStellatedShape}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a stellated polyhedron" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stellated-octahedron">Stellated Octahedron</SelectItem>
                      <SelectItem value="stellated-dodecahedron">Stellated Dodecahedron</SelectItem>
                      <SelectItem value="stellated-icosahedron">Stellated Icosahedron</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>
              
              <Scene>
                {polyhedronType === 'platonic' && renderPlatonicPolyhedra()}
                {polyhedronType === 'archimedean' && renderArchimedeanPolyhedra()}
                {polyhedronType === 'stellated' && renderStellatedPolyhedra()}
              </Scene>
            </CardContent>
            <CardFooter>
              <div className="text-sm text-muted-foreground">
                {polyhedronType === 'platonic' && 'Platonic solids are regular, convex polyhedra with congruent faces of regular polygons.'}
                {polyhedronType === 'archimedean' && 'Archimedean solids are semi-regular convex polyhedra made of regular polygons meeting in identical vertices.'}
                {polyhedronType === 'stellated' && 'Stellated polyhedra are created by extending the faces or edges of a polyhedron until they meet to form a new polyhedron.'}
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
