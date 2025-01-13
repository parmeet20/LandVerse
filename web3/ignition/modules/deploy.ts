import { ethers } from "hardhat"

const main = async () => {
    const Cont = await ethers.getContractFactory("Land");
    const cont = await Cont.deploy();
    console.log(`DEPLOYED TO ADDRESS -> ${await cont.getAddress()}`)
}
main().then(() => console.log("SUCCESS")).catch((err) => console.log(err));