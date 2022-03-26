import { useContractReader } from "eth-hooks";
import { ethers } from "ethers";
import React from "react";
import { Link } from "react-router-dom";

/**
 * web3 props can be passed from '../App.jsx' into your local view component for use
 * @param {*} yourLocalBalance balance on current network
 * @param {*} readContracts contracts from current chain already pre-loaded using ethers contract module. More here https://docs.ethers.io/v5/api/contract/contract/
 * @returns react component
 **/

function Home({ writeContracts, tx, address }) {
  // you can also use hooks locally in your component of choice
  // in this case, let's keep track of 'purpose' variable from our contract
  const profile = {
    to: address,
    handle: "Athena",
    imageURI: "",
    // followModule: "0x8731324a6C09a1745bD15009Dc8FcceF11c05F4a",
    followModule: ethers.constants.AddressZero,
    followModuleData: [],
    followNFTURI: "",
  };

  return (
    <div>
      <button
        onClick={async () => {
          /* look how you call setPurpose on your contract: */
          /* notice how you pass a call back for tx updates too */
          const result = tx(writeContracts.LensHub.createProfile(profile), update => {
            console.log("📡 Transaction Update:", update);
            if (update && (update.status === "confirmed" || update.status === 1)) {
              console.log(" 🍾 Transaction " + update.hash + " finished!");
              console.log(
                " ⛽️ " +
                  update.gasUsed +
                  "/" +
                  (update.gasLimit || update.gas) +
                  " @ " +
                  parseFloat(update.gasPrice) / 1000000000 +
                  " gwei",
              );
            }
          });
          console.log("awaiting metamask/web3 confirm result...", result);
          console.log(await result);
        }}
      >
        {" "}
        Click
      </button>
    </div>
  );
}

export default Home;
