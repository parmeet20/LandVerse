import { useState, useRef } from "react";
import { Box } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Building } from "@/context/Web3Context";

interface AnimatedCubeProps {
  building: Building;
  onClick: () => void;
}

const AnimatedCube: React.FC<AnimatedCubeProps> = ({ building, onClick }) => {
  const [hovered, setHovered] = useState(false);
  const cubeRef = useRef<any>(null);

  const posX = Number(building.posX);
  const posZ = Number(building.posZ);
  const sizeX = Number(building.sizeX);
  const sizeY = Number(building.sizeY);
  const sizeZ = Number(building.sizeZ);

  const rotationSpeed = 0.02;

  useFrame(() => {
    if (cubeRef.current && hovered) {
      cubeRef.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <Box
      ref={cubeRef}
      args={[sizeX, sizeY, sizeZ]}
      position={[posX, sizeY / 2, posZ]}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      castShadow
    >
      <meshStandardMaterial
        color={"#bc4749"}
        metalness={0.4}
        roughness={0.7}
      />
    </Box>
  );
};

export default AnimatedCube;
