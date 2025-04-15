
// Golden ratio constant (φ)
export const GOLDEN_RATIO = 1.618033988749895;

export function calculateShapeProperties(shapeType: string, size: number, sides: number = 5) {
  switch(shapeType) {
    case "circle":
      return calculateCircleProperties(size);
    case "square":
      return calculateSquareProperties(size);
    case "rectangle":
      return calculateRectangleProperties(size);
    case "triangle":
      return calculateTriangleProperties(size);
    case "polygon":
      return calculateRegularPolygonProperties(size, sides);
    case "pentagon":
      return calculateRegularPolygonProperties(size, 5);
    case "hexagon":
      return calculateRegularPolygonProperties(size, 6);
    case "octagon":
      return calculateRegularPolygonProperties(size, 8);
    case "star":
      return calculateStarProperties(size, 5);
    case "ellipse":
      return calculateEllipseProperties(size);
    default:
      return { "Note": "Properties unavailable" };
  }
}

// Circle properties
function calculateCircleProperties(radius: number) {
  const area = Math.PI * radius * radius;
  const circumference = 2 * Math.PI * radius;
  const diameter = 2 * radius;
  
  return {
    "Area": area,
    "Circumference": circumference,
    "Diameter": diameter,
    "Radius": radius
  };
}

// Square properties
function calculateSquareProperties(size: number) {
  const sideLength = size * 2; // Adjust for actual displayed size
  const area = sideLength * sideLength;
  const perimeter = 4 * sideLength;
  const diagonal = Math.sqrt(2) * sideLength;
  
  return {
    "Area": area,
    "Perimeter": perimeter,
    "Side Length": sideLength,
    "Diagonal": diagonal
  };
}

// Rectangle properties
function calculateRectangleProperties(size: number) {
  const width = 3 * size; // Based on the drawing dimensions
  const height = 2 * size;
  const area = width * height;
  const perimeter = 2 * (width + height);
  const diagonal = Math.sqrt(width * width + height * height);
  const aspectRatio = width / height;
  const isGoldenRatio = Math.abs(aspectRatio - GOLDEN_RATIO) < 0.01 || 
                        Math.abs(height / width - GOLDEN_RATIO) < 0.01;
  
  return {
    "Area": area,
    "Perimeter": perimeter,
    "Width": width,
    "Height": height,
    "Diagonal": diagonal,
    "Aspect Ratio": aspectRatio,
    "goldenRatio": isGoldenRatio
  };
}

// Triangle properties (for equilateral triangle)
function calculateTriangleProperties(size: number) {
  // In our simulation, we use an equilateral triangle
  const sideLength = size * 2; // Approximate based on rendering
  const height = sideLength * Math.sqrt(3) / 2;
  const area = (sideLength * height) / 2;
  const perimeter = 3 * sideLength;
  const inradius = height / 3;
  const circumradius = sideLength / Math.sqrt(3);
  
  return {
    "Area": area,
    "Perimeter": perimeter,
    "Side Length": sideLength,
    "Height": height,
    "Inradius": inradius,
    "Circumradius": circumradius,
    "Interior Angle": 60 // in degrees
  };
}

// Regular polygon properties
function calculateRegularPolygonProperties(size: number, sides: number) {
  const sideLength = 2 * size * Math.sin(Math.PI / sides);
  const area = (sides * size * size * Math.sin(2 * Math.PI / sides)) / 2;
  const perimeter = sides * sideLength;
  const interiorAngle = ((sides - 2) * 180) / sides;
  const exteriorAngle = 360 / sides;
  const inradius = size * Math.cos(Math.PI / sides);
  const circumradius = size;
  
  // Check for pentagon (5 sides) which relates to golden ratio
  const goldenRatioPresent = sides === 5;
  
  return {
    "Area": area,
    "Perimeter": perimeter,
    "Side Length": sideLength,
    "Interior Angle": interiorAngle,
    "Exterior Angle": exteriorAngle,
    "Inradius": inradius,
    "Circumradius": circumradius,
    "Number of Sides": sides,
    "goldenRatio": goldenRatioPresent
  };
}

// Star properties
function calculateStarProperties(size: number, points: number) {
  const outerRadius = size;
  const innerRadius = size / 2;
  const outerPerimeter = points * 2 * outerRadius * Math.sin(Math.PI / points);
  
  // Star area is complex but can be approximated
  const approximateArea = points * 
    ((outerRadius * outerRadius * Math.sin(2 * Math.PI / points)) / 2 - 
     (innerRadius * innerRadius * Math.sin(2 * Math.PI / points)) / 2);
  
  // The star pentagram (5-pointed star) relates to the golden ratio
  const goldenRatioPresent = points === 5;
  
  return {
    "Approximate Area": approximateArea,
    "Outer Perimeter": outerPerimeter,
    "Outer Radius": outerRadius,
    "Inner Radius": innerRadius,
    "Points": points,
    "goldenRatio": goldenRatioPresent
  };
}

// Ellipse properties
function calculateEllipseProperties(size: number) {
  const a = size * 1.5; // Semi-major axis
  const b = size;  // Semi-minor axis
  
  // Approximate perimeter using Ramanujan's formula
  const h = Math.pow((a - b) / (a + b), 2);
  const perimeter = Math.PI * (a + b) * (1 + (3 * h) / (10 + Math.sqrt(4 - 3 * h)));
  
  const area = Math.PI * a * b;
  const eccentricity = Math.sqrt(1 - (b * b) / (a * a));
  
  // Check for golden ratio - if a/b is approximately the golden ratio
  const ratio = a / b;
  const isGoldenRatio = Math.abs(ratio - GOLDEN_RATIO) < 0.01;
  
  return {
    "Area": area,
    "Approximate Perimeter": perimeter,
    "Semi-major Axis (a)": a,
    "Semi-minor Axis (b)": b,
    "Eccentricity": eccentricity,
    "Aspect Ratio (a/b)": ratio,
    "goldenRatio": isGoldenRatio
  };
}

// Calculate 3D shape properties
export function calculate3DShapeProperties(shapeType: string, scale: number = 1) {
  switch(shapeType) {
    case "cube":
      return calculateCubeProperties(scale);
    case "sphere":
      return calculateSphereProperties(scale);
    case "cylinder":
      return calculateCylinderProperties(scale);
    case "cone":
      return calculateConeProperties(scale);
    case "torus":
      return calculateTorusProperties(scale);
    case "tetrahedron":
      return calculateTetrahedronProperties(scale);
    case "octahedron":
      return calculateOctahedronProperties(scale);
    case "dodecahedron":
      return calculateDodecahedronProperties(scale);
    case "icosahedron":
      return calculateIcosahedronProperties(scale);
    default:
      return { "Note": "Properties unavailable for this shape" };
  }
}

// Cube properties
function calculateCubeProperties(scale: number) {
  const sideLength = scale;
  const volume = Math.pow(sideLength, 3);
  const surfaceArea = 6 * Math.pow(sideLength, 2);
  const diagonalLength = Math.sqrt(3) * sideLength;
  
  return {
    "Volume": volume,
    "Surface Area": surfaceArea,
    "Side Length": sideLength,
    "Face Diagonal": Math.sqrt(2) * sideLength,
    "Space Diagonal": diagonalLength
  };
}

// Sphere properties
function calculateSphereProperties(scale: number) {
  const radius = scale * 0.5;
  const volume = (4/3) * Math.PI * Math.pow(radius, 3);
  const surfaceArea = 4 * Math.PI * Math.pow(radius, 2);
  const diameter = 2 * radius;
  
  return {
    "Volume": volume,
    "Surface Area": surfaceArea,
    "Radius": radius,
    "Diameter": diameter
  };
}

// Cylinder properties
function calculateCylinderProperties(scale: number) {
  const radius = scale * 0.5;
  const height = scale;
  const volume = Math.PI * Math.pow(radius, 2) * height;
  const lateralArea = 2 * Math.PI * radius * height;
  const baseArea = Math.PI * Math.pow(radius, 2);
  const totalSurfaceArea = lateralArea + 2 * baseArea;
  
  return {
    "Volume": volume,
    "Lateral Surface Area": lateralArea,
    "Base Area": baseArea,
    "Total Surface Area": totalSurfaceArea,
    "Radius": radius,
    "Height": height
  };
}

// Cone properties
function calculateConeProperties(scale: number) {
  const radius = scale * 0.5;
  const height = scale;
  const slantHeight = Math.sqrt(Math.pow(radius, 2) + Math.pow(height, 2));
  const volume = (1/3) * Math.PI * Math.pow(radius, 2) * height;
  const baseArea = Math.PI * Math.pow(radius, 2);
  const lateralArea = Math.PI * radius * slantHeight;
  const totalSurfaceArea = lateralArea + baseArea;
  
  return {
    "Volume": volume,
    "Base Area": baseArea,
    "Lateral Surface Area": lateralArea,
    "Total Surface Area": totalSurfaceArea,
    "Radius": radius,
    "Height": height,
    "Slant Height": slantHeight
  };
}

// Torus properties
function calculateTorusProperties(scale: number) {
  const majorRadius = scale * 0.5;
  const minorRadius = scale * 0.2;
  const volume = 2 * Math.pow(Math.PI, 2) * majorRadius * Math.pow(minorRadius, 2);
  const surfaceArea = 4 * Math.pow(Math.PI, 2) * majorRadius * minorRadius;
  
  return {
    "Volume": volume,
    "Surface Area": surfaceArea,
    "Major Radius": majorRadius,
    "Minor Radius": minorRadius
  };
}

// Tetrahedron properties
function calculateTetrahedronProperties(scale: number) {
  const edge = scale * 0.6 * 2;
  const volume = Math.pow(edge, 3) / (6 * Math.sqrt(2));
  const surfaceArea = Math.sqrt(3) * Math.pow(edge, 2);
  const height = edge * Math.sqrt(6) / 3;
  const inscribedSphereRadius = edge / (2 * Math.sqrt(6));
  const circumscribedSphereRadius = edge * Math.sqrt(6) / 4;
  
  return {
    "Volume": volume,
    "Surface Area": surfaceArea,
    "Edge Length": edge,
    "Height": height,
    "Inscribed Sphere Radius": inscribedSphereRadius,
    "Circumscribed Sphere Radius": circumscribedSphereRadius
  };
}

// Octahedron properties
function calculateOctahedronProperties(scale: number) {
  const edge = scale * 0.6 * Math.sqrt(2);
  const volume = Math.sqrt(2) * Math.pow(edge, 3) / 3;
  const surfaceArea = 2 * Math.sqrt(3) * Math.pow(edge, 2);
  const height = edge * Math.sqrt(2);
  
  return {
    "Volume": volume,
    "Surface Area": surfaceArea,
    "Edge Length": edge,
    "Height": height
  };
}

// Dodecahedron properties
function calculateDodecahedronProperties(scale: number) {
  const edge = scale * 0.6 / 1.41; // Approximation based on Three.js scaling
  const volume = (15 + 7 * Math.sqrt(5)) * Math.pow(edge, 3) / 4;
  const surfaceArea = 3 * Math.sqrt(25 + 10 * Math.sqrt(5)) * Math.pow(edge, 2);
  
  // Dodecahedron has a relation to the golden ratio
  const goldenRatioPresent = true;
  
  return {
    "Volume": volume,
    "Surface Area": surfaceArea,
    "Edge Length": edge,
    "Golden Ratio Relationship": "Faces are pentagons with golden ratio properties",
    "goldenRatio": goldenRatioPresent
  };
}

// Icosahedron properties
function calculateIcosahedronProperties(scale: number) {
  const edge = scale * 0.6 / 1.25; // Approximation based on Three.js scaling
  const volume = (5 * (3 + Math.sqrt(5)) * Math.pow(edge, 3)) / 12;
  const surfaceArea = 5 * Math.sqrt(3) * Math.pow(edge, 2);
  
  // Icosahedron also has a relation to the golden ratio
  const goldenRatioPresent = true;
  
  return {
    "Volume": volume,
    "Surface Area": surfaceArea,
    "Edge Length": edge,
    "Golden Ratio Relationship": "Icosahedron contains golden ratio relationships",
    "goldenRatio": goldenRatioPresent
  };
}
