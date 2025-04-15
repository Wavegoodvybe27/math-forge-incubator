
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
    <mesh position={position as [number, number, number]}>
      <boxGeometry args={[scale, scale, scale]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const Sphere = ({ position = [0, 0, 0], color = 'royalblue', scale = 1 }) => {
  return (
    <mesh position={position as [number, number, number]}>
      <sphereGeometry args={[scale * 0.5, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const Cylinder = ({ position = [0, 0, 0], color = 'green', scale = 1 }) => {
  return (
    <mesh position={position as [number, number, number]}>
      <cylinderGeometry args={[scale * 0.5, scale * 0.5, scale, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const Cone = ({ position = [0, 0, 0], color = 'red', scale = 1 }) => {
  return (
    <mesh position={position as [number, number, number]}>
      <coneGeometry args={[scale * 0.5, scale, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const Torus = ({ position = [0, 0, 0], color = 'purple', scale = 1 }) => {
  return (
    <mesh position={position as [number, number, number]}>
      <torusGeometry args={[scale * 0.5, scale * 0.2, 16, 100]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

// Polyhedra section
const Tetrahedron = ({ position = [0, 0, 0], color = '#FF5733', scale = 1 }) => {
  return (
    <mesh position={position as [number, number, number]}>
      <tetrahedronGeometry args={[scale * 0.6, 0]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const Octahedron = ({ position = [0, 0, 0], color = '#33FF57', scale = 1 }) => {
  return (
    <mesh position={position as [number, number, number]}>
      <octahedronGeometry args={[scale * 0.6, 0]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const Dodecahedron = ({ position = [0, 0, 0], color = '#5733FF', scale = 1 }) => {
  return (
    <mesh position={position as [number, number, number]}>
      <dodecahedronGeometry args={[scale * 0.6, 0]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const Icosahedron = ({ position = [0, 0, 0], color = '#FFFF33', scale = 1 }) => {
  return (
    <mesh position={position as [number, number, number]}>
      <icosahedronGeometry args={[scale * 0.6, 0]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

// Enhanced ArchimedeanSolid component to make them visually distinct
const ArchimedeanSolid = ({ type, position = [0, 0, 0], scale = 1 }) => {
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

  // Base geometry based on type
  const getGeometry = () => {
    switch(type) {
      case 'truncated-tetrahedron':
        return <octahedronGeometry args={[scale * 0.7, 1]} />;
      case 'cuboctahedron':
        return <dodecahedronGeometry args={[scale * 0.6, 1]} />;
      case 'truncated-octahedron':
        return <icosahedronGeometry args={[scale * 0.6, 1]} />;
      case 'rhombicuboctahedron':
        return <octahedronGeometry args={[scale * 0.7, 2]} />;
      default:
        return <octahedronGeometry args={[scale * 0.7, 1]} />;
    }
  };

  // Archimedean solids have a distinctive look - use a combination of materials
  return (
    <group position={position as [number, number, number]}>
      <mesh ref={meshRef}>
        {getGeometry()}
        <meshStandardMaterial color="#33C4FF" flatShading />
      </mesh>
      {/* Add wireframe overlay to distinguish from other solids */}
      <mesh ref={meshRef}>
        {getGeometry()}
        <meshStandardMaterial color="#FFFFFF" wireframe opacity={0.3} transparent />
      </mesh>
    </group>
  );
};

// Enhanced StellatedSolid component to make them visually distinct
const StellatedSolid = ({ type, position = [0, 0, 0], scale = 1 }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const spikesRef = useRef<THREE.Group>(null);
  
  useEffect(() => {
    if (!meshRef.current || !spikesRef.current) return;
    
    const animate = () => {
      if (meshRef.current && spikesRef.current) {
        meshRef.current.rotation.y += 0.01;
        spikesRef.current.rotation.y -= 0.005;
      }
      requestAnimationFrame(animate);
    };
    
    const animationId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Get base geometry based on type
  const getBaseGeometry = () => {
    switch(type) {
      case 'stellated-octahedron':
        return <octahedronGeometry args={[scale * 0.5, 0]} />;
      case 'stellated-dodecahedron':
        return <dodecahedronGeometry args={[scale * 0.5, 0]} />;
      case 'stellated-icosahedron':
        return <icosahedronGeometry args={[scale * 0.5, 0]} />;
      default:
        return <octahedronGeometry args={[scale * 0.5, 0]} />;
    }
  };

  // Stellated solids have spikes coming out
  return (
    <group position={position as [number, number, number]}>
      {/* Base shape */}
      <mesh ref={meshRef}>
        {getBaseGeometry()}
        <meshStandardMaterial color="#FF33A8" />
      </mesh>
      
      {/* Outer spikes structure */}
      <group ref={spikesRef}>
        <mesh>
          {getBaseGeometry()}
          <meshStandardMaterial 
            color="#FF33A8" 
            wireframe 
            opacity={0.7} 
            transparent
            emissive="#FF33A8"
            emissiveIntensity={0.5}
          />
        </mesh>
        <mesh scale={1.4}>
          {getBaseGeometry()}
          <meshStandardMaterial 
            color="#FF33A8" 
            wireframe 
            opacity={0.3} 
            transparent
          />
        </mesh>
      </group>
    </group>
  );
};

// Animation component for polyhedra
const AnimatedPolyhedron = ({ geometry, position = [0, 0, 0], color = '#FF5733', scale = 1 }) => {
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
    <mesh ref={meshRef} position={position as [number, number, number]}>
      {geometry === 'tetrahedron' && <tetrahedronGeometry args={[scale * 0.6, 0]} />}
      {geometry === 'octahedron' && <octahedronGeometry args={[scale * 0.6, 0]} />}
      {geometry === 'dodecahedron' && <dodecahedronGeometry args={[scale * 0.6, 0]} />}
      {geometry === 'icosahedron' && <icosahedronGeometry args={[scale * 0.6, 0]} />}
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

// New component for Non-Euclidean geometry visualization
const NonEuclideanGeometry = ({ type = "hyperbolic" }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useEffect(() => {
    if (!groupRef.current) return;
    
    const animate = () => {
      if (groupRef.current) {
        groupRef.current.rotation.y += 0.005;
      }
      requestAnimationFrame(animate);
    };
    
    const animationId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  // For hyperbolic space (negative curvature)
  if (type === "hyperbolic") {
    return (
      <group ref={groupRef}>
        {/* Create a grid of lines to demonstrate hyperbolic space */}
        {Array.from({ length: 12 }).map((_, idx) => (
          <group key={`hyperbolic-line-${idx}`} rotation={[0, Math.PI * idx / 6, 0]}>
            {Array.from({ length: 5 }).map((_, i) => (
              <mesh key={`mesh-${idx}-${i}`} position={[0, 0, (i + 1) * 0.4]}>
                <sphereGeometry args={[0.05, 16, 16]} />
                <meshStandardMaterial color="#33C4FF" />
              </mesh>
            ))}
            <mesh>
              <tubeGeometry args={[
                new THREE.CatmullRomCurve3([
                  new THREE.Vector3(0, 0, 0), 
                  new THREE.Vector3(0, Math.sin(idx * 0.5) * 0.5, 2)
                ]), 
                20, 
                0.02, 
                8
              ]} />
              <meshStandardMaterial color="#33C4FF" />
            </mesh>
          </group>
        ))}
      </group>
    );
  }
  
  // For elliptic space (positive curvature)
  return (
    <group ref={groupRef}>
      {/* Create a spherical grid to demonstrate elliptic space */}
      <mesh>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial color="#FF5733" wireframe opacity={0.3} transparent />
      </mesh>
      
      {/* Add some great circles to show geometry on a sphere */}
      {Array.from({ length: 8 }).map((_, idx) => (
        <mesh key={`elliptic-circle-${idx}`} rotation={[Math.PI/2, Math.PI * idx / 4, 0]}>
          <torusGeometry args={[1.2, 0.01, 16, 100]} />
          <meshStandardMaterial color="#FF5733" />
        </mesh>
      ))}
    </group>
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
  const [nonEuclideanType, setNonEuclideanType] = useState('hyperbolic');

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

  // Updated Archimedean polyhedra rendering
  const renderArchimedeanPolyhedra = () => (
    <ArchimedeanSolid type={archimedeanShape} position={[0, 0, 0]} />
  );

  // Updated Stellated polyhedra rendering
  const renderStellatedPolyhedra = () => (
    <StellatedSolid type={stellatedShape} position={[0, 0, 0]} />
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="3D Geometry Explorer"
        description="Explore three-dimensional shapes and their properties"
      />
      
      <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">Basic Shapes</TabsTrigger>
          <TabsTrigger value="polyhedra">Polyhedra</TabsTrigger>
          <TabsTrigger value="non-euclidean">Non-Euclidean</TabsTrigger>
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

        <TabsContent value="non-euclidean" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Non-Euclidean 3D Geometry</CardTitle>
              <CardDescription>
                Explore geometries with different curvature properties than Euclidean space
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Select value={nonEuclideanType} onValueChange={setNonEuclideanType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select non-Euclidean type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hyperbolic">Hyperbolic (Negative Curvature)</SelectItem>
                    <SelectItem value="elliptic">Elliptic (Positive Curvature)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Scene>
                <NonEuclideanGeometry type={nonEuclideanType} />
              </Scene>
            </CardContent>
            <CardFooter>
              <div className="text-sm text-muted-foreground">
                {nonEuclideanType === 'hyperbolic' && 
                  'In hyperbolic geometry, parallel lines diverge and the sum of angles in a triangle is less than 180°.'}
                {nonEuclideanType === 'elliptic' && 
                  'In elliptic geometry, there are no parallel lines and the sum of angles in a triangle exceeds 180°.'}
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
