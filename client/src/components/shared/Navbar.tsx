import React, { useState } from 'react';
import { useWeb3Context } from "@/context/Web3Context";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LandPlot } from 'lucide-react';

const Navbar: React.FC = () => {
  const { account, isConnected, mintBuilding } = useWeb3Context();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newBuildingData, setNewBuildingData] = useState({
    name: "",
    posX: 0,
    posY: 0,
    posZ: 0,
  });

  const shortedAddress = (address: string) => {
    return `${address.slice(0, 5)}...${address.slice(-3)}`;
  };

  const handleMint = async () => {
    const { name, posX, posY,posZ } = newBuildingData;
    const sizeX = 5;
    const sizeY = 5;
    const sizeZ = 5;

    await mintBuilding(name, posX, posY, posZ, sizeX, sizeY, sizeZ);
    setDialogOpen(false);
  };

  return (
    <div className="fixed top-0 flex items-center justify-between px-9 bg-white/60 backdrop-blur-lg left-0 right-0 p-5 text-slate-500 rounded-b-lg shadow-lg z-10">

      <div className="text-2xl flex items-center font-bold text-slate-800">
        <LandPlot className='mr-2'/>
      LandVerse
      </div>

      <div className="flex items-center space-x-5">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="mx-auto">Mint New Plot</Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a New Building</DialogTitle>
              <DialogDescription>Specify building details for minting.</DialogDescription>
            </DialogHeader>

            <div>
              <label>
                Name:
                <Input
                  type="text"
                  value={newBuildingData.name}
                  onChange={(e) =>
                    setNewBuildingData({ ...newBuildingData, name: e.target.value })
                  }
                />
              </label>
            </div>
            <div>
              <label>
                Position X:
                <Input
                  type="number"
                  value={newBuildingData.posX}
                  onChange={(e) =>
                    setNewBuildingData({ ...newBuildingData, posX: Number(e.target.value) })
                  }
                />
              </label>
            </div>
            <div>
              <label>
                Position Y:
                <Input
                  type="number"
                  value={newBuildingData.posY}
                  onChange={(e) =>
                    setNewBuildingData({ ...newBuildingData, posY: Number(e.target.value) })
                  }
                />
              </label>
            </div>
            <div>
              <label>
                Position Z:
                <Input
                  type="number"
                  value={newBuildingData.posZ}
                  onChange={(e) =>
                    setNewBuildingData({ ...newBuildingData, posZ: Number(e.target.value) })
                  }
                />
              </label>
            </div>

            <Button onClick={handleMint}>Mint Building</Button>
          </DialogContent>
        </Dialog>

        {isConnected ? (
          <Button variant="secondary">Connected: {shortedAddress(account!)}</Button>
        ) : (
          <Button>Please connect your wallet</Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
