import { Building, useWeb3Context } from "@/context/Web3Context";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ArrowUpDown, User, Box, Locate } from "lucide-react";

interface BuildingCardProps {
  building: Building | null;
  onTransfer: (newRecipient: string) => void;
}

const BuildingCard: React.FC<BuildingCardProps> = ({ building, onTransfer }) => {
  const { account } = useWeb3Context();
  if (!building) return null;

  return (
    <div className="absolute bottom-3 right-3 p-5">
      <Card className="w-96 shadow-xl rounded-lg backdrop-blur-lg bg-white/80 border">
        <CardHeader>
          <CardTitle>{building.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            <div className="flex items-center mb-2">
              <User className="mr-2 font-bold" />
               {building.owner === "0x0" ? "No owner" : `${building.owner.slice(0,18)}...${building.owner.slice(-18)}`}
            </div>
            <div className="flex items-center mb-2">
              <Locate className="mr-2" />
              <strong>Position:</strong> ({Number(building.posX)}, {Number(building.posY)}, {Number(building.posZ)})
            </div>
            <div className="flex items-center mb-2">
              <Box className="mr-2" />
              <strong>Size:</strong> ({Number(building.sizeX)}, {Number(building.sizeY)}, {Number(building.sizeZ)})
            </div>
          </CardDescription>
        </CardContent>
        <CardFooter>
          {building.owner.toLowerCase() === account?.toLowerCase() && (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full flex items-center">Transfer Building <ArrowUpDown /></Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Transfer Building</DialogTitle>
                </DialogHeader>
                <div className="p-4">
                  <Input
                    type="text"
                    placeholder="Recipient address"
                    className="p-2 border rounded mb-4 w-full"
                    id="recipientAddress"
                  />
                  <DialogFooter>
                    <Button
                      className="w-full flex items-center"
                      onClick={() => {
                        const recipient = (document.getElementById('recipientAddress') as HTMLInputElement).value;
                        onTransfer(recipient);
                      }}
                    >
                      Transfer
                      <ArrowUpDown />
                    </Button>
                  </DialogFooter>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default BuildingCard;
