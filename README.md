# LandVerse DApp

## Project Overview
LandVerse is a blockchain-based decentralized application (DApp) that allows users to mint 3D land as NFTs in a metaverse 3D space. Users can specify the position of the land in the 3D space (posX, posY, posZ) and mint it at a cost of 1 Ether. Additionally, users can transfer ownership of their land NFTs to others, providing flexibility and utility in the metaverse.

---

## Features

1. **Mint 3D Land**:
   - Users can mint 3D land in the metaverse by specifying its position (posX, posY, posZ).
   - Each land mint costs 1 Ether.
   - Land is represented as an NFT stored securely on the blockchain.

2. **Ownership Transfer**:
   - Users can transfer ownership of their land NFTs to other users.

3. **3D Metaverse Integration**:
   - The minted land is displayed in a 3D metaverse space, allowing for immersive interaction.

---

## Installation

<p>Follow the steps below to install the dependencies:</p>

```bash
cd client
npm i
cd ..
cd web3
npm i
cd ..
```

---

## Running the Project

<p>Follow these commands to start the application:</p>

```bash
cd web3
npx hardhat node
npx hardhat run ignition/modules/Dappazon.ts --network localhost #in another terminal window
cd client
npm run dev
cd ..
```

---

## Project Structure

- **`web3/`**: Contains the smart contracts written in Solidity.
- **`client/`**: Contains the frontend application built with React.

---

## Technologies Used

- **Frontend**: React.js with TypeScript
- **Backend**: Solidity (Smart Contracts)
- **Blockchain Framework**: Hardhat

---

## Final Preview

<h2>Screenshots</h2>

<img width="960" alt="image" src="https://github.com/user-attachments/assets/ec14355a-5f16-4ac1-84d9-581fcaa8a154" />
<img width="960" alt="image" src="https://github.com/user-attachments/assets/aaa59556-d367-46c2-9690-186bdcbd9c67" />
<img width="960" alt="image" src="https://github.com/user-attachments/assets/08b93103-ddda-4d5e-9b0e-9c794313b29b" />

---

## Contribution

If you'd like to contribute to this project, feel free to open a pull request or raise an issue. We welcome all contributions!

---

## License

This project is licensed under the [MIT License](LICENSE).
