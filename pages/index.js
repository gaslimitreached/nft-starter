import { useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";

// Reference to deployed contract
// NOTE: having issues? make sure you deployed your contract and make sure to
// check the network you are on.
import { contractAddr } from "../config";
import MyToken from "../artifacts/contracts/ProbablyNothing.sol/MyToken.json";

export default function Home() {
  const [errorMsg, setErrorMsg] = useState(undefined);
  // Capture form state
  const [mintForm, updateMintForm] = useState({
    price: "",
    numToMint: "1",
  });

  // web modal helper.
  // TODO: config cache
  async function getProvider() {
    const web3Modal = new Web3Modal({});
    const connection = await web3Modal.connect();
    return new ethers.providers.Web3Provider(connection);
  }

  async function mint() {
    const { numToMint } = mintForm;
    const provider = await getProvider();
    const { name } = await provider.getNetwork();
    if (name !== "matic") {
      setErrorMsg(`You are on the wrong network: ${name}`);
      return;
    }
    const contract = new ethers.Contract(
      contractAddr,
      MyToken.abi,
      provider.getSigner()
    );

    const price_ = await contract.price();
    const price = ethers.utils.formatUnits(`${price_.mul(numToMint)}`, "wei");
    try {
      const token = await contract.mint(amount, { value: price });
      await token.wait();
    } catch (error) {
      setErrorMsg(error.message);
      console.log(error.message);
    }
  }

  return (
    <div className="relative overflow-y-scroll">
      <h1 className="flex justify-center text-3xl m-14">ProjectName!</h1>
      {errorMsg ? (
        <h2 className="flex justify-center text-2xl text-red-500">
          {errorMsg}
        </h2>
      ) : (
        <></>
      )}
      <div className="flex justify-center pt-4">
        <div className="w-1/2 flex flex-col pb-8">
          <input
            placeholder={`${mintForm.numToMint}`}
            className="mt-2 border rounded p-4"
            onChange={(e) =>
              updateMintForm({ ...mintForm, numToMint: e.target.value })
            }
          />
          <button
            className="font-bold mt-4 bg-green-600 text-white rounded p-4 shadow-lg"
            onClick={mint}
          >
            MINT {mintForm.numToMint || 0}
          </button>
        </div>
      </div>
    </div>
  );
}
