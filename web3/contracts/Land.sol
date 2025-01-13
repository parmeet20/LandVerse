// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Land is ERC721 {

    struct Building {
        string name;
        address owner;
        int256 posX;
        int256 posY;
        int256 posZ;
        int256 sizeX;
        int256 sizeY;
        int256 sizeZ;
        uint256 price;
    }

    uint256 public cost = 1 ether;
    uint256 public maxSupply = 500;
    uint256 public totalSupply = 0;
    Building[] public buildings;

    constructor() ERC721("My Land", "MLND") {}

    function mint(string memory _name, int256 _posX, int256 _posY, int256 _posZ, 
                  int256 _sizeX, int256 _sizeY, int256 _sizeZ) public payable {
        require(totalSupply < maxSupply, "Building not available");
        require(msg.value >= cost, "Not enough Ether sent");

        uint256 buildingId = totalSupply + 1;

        Building memory newBuilding = Building({
            name: _name,
            owner: msg.sender,
            posX: _posX,
            posY: _posY,
            posZ: _posZ,
            sizeX: _sizeX,
            sizeY: _sizeY,
            sizeZ: _sizeZ,
            price: cost
        });

        buildings.push(newBuilding);
        totalSupply += 1;
        _safeMint(msg.sender, buildingId);
    }

    function transferFrom(address from, address to, uint256 _id) public override {
        require(
            msg.sender == from,"You are not the owner of this token"
        );
        Building storage building = buildings[_id - 1];
        require(msg.sender == building.owner,"You are not the owner of this token");
        building.owner = to;
        
        building.price += building.price / 20;

        _safeTransfer(from, to, _id, "");
    }

    function getBuildings() public view returns (Building[] memory) {
        return buildings;
    }

    function getBuilding(uint256 _id) public view returns (Building memory) {
        require(_id > 0 && _id <= totalSupply, "Invalid building ID");
        return buildings[_id - 1];
    }

    function getBuildingPrice(uint256 _id) public view returns (uint256) {
        require(_id > 0 && _id <= totalSupply, "Invalid building ID");
        return buildings[_id - 1].price;
    }
}
