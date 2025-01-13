import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Plane } from "@react-three/drei";
import AnimatedCube from "./AnimatedCube";
import BuildingCard from "./BuildingCard";
import { Building, useWeb3Context } from "@/context/Web3Context";
interface ThreeSceneProps {
  buildings: Building[];
}
const ThreeScene: React.FC<ThreeSceneProps> = ({ buildings }) => {
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(
    null
  );
  const { transferBuilding, account } = useWeb3Context();
  const handleTransfer = async (newRecipient: string) => {
    if (!selectedBuilding || !newRecipient || !account) {
      alert("Invalid building or recipient address.");
      return;
    }
    const buildingId = buildings.indexOf(selectedBuilding) + 1;
    try {
      await transferBuilding(account, newRecipient, buildingId);
    } catch (err) {
      console.error("Error transferring building:", err);
    }
  };
  return (
    <div style={{ position: "relative", height: "100vh" }}>
      {" "}
      <Canvas
        camera={{ position: [0, 10, 20], fov: 50 }}
        style={{ backgroundColor: "#48cae4" }}
      >
        {" "}
        <ambientLight intensity={0.5} />{" "}
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />{" "}
        <pointLight position={[5, 5, 5]} intensity={1} />{" "}
        <spotLight
          position={[10, 10, 10]}
          intensity={2}
          angle={0.15}
          penumbra={1}
          castShadow
        />{" "}
        <hemisphereLight
          intensity={0.3}
          color={"#87CEEB"}
          groundColor={"#48cae4"}
        />{" "}
        <Plane
          args={[5000, 5000]}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0, 0]}
          receiveShadow
        >
          {" "}
          <meshStandardMaterial
            color="#99d98c"
            roughness={0.5}
            metalness={0.2}
          />{" "}
        </Plane>{" "}
        {buildings.map((building, index) => (
          <AnimatedCube
            key={index}
            building={building}
            onClick={() => setSelectedBuilding(building)}
          />
        ))}{" "}
        <OrbitControls />{" "}
      </Canvas>{" "}
      <BuildingCard building={selectedBuilding} onTransfer={handleTransfer} />{" "}
    </div>
  );
};
export default ThreeScene;
