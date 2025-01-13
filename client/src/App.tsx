import { useEffect, useState } from "react";
import { Building, useWeb3Context } from "./context/Web3Context";
import ThreeScene from "./components/shared/3DScene";

const App = () => {
  const { getBuildings, isConnected } = useWeb3Context();
  const [buildings, setBuildings] = useState<Building[]>([]);

  useEffect(() => {
    const fetchBuildings = async () => {
      if (isConnected) {
        const buildingsFromContract = await getBuildings();
        setBuildings(buildingsFromContract);
      }
    };
    fetchBuildings();
  }, [isConnected, getBuildings]);

  return (
    <div style={{ height: "100vh" }}>
      {isConnected ? (
        <ThreeScene buildings={buildings} />
      ) : (
        <p>Connect to your wallet to see the buildings.</p>
      )}
    </div>
  );
};

export default App;
