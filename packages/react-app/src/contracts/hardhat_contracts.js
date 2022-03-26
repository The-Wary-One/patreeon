import lensHubArtifact from "./LensHub.json";

const contracts = {
  31337: {
    localhost: {
      name: "localhost",
      chain: "31337",
      contracts: {
        LensHub: {
          address: process.env.REACT_APP_LENS_HUB_ADDRESS,
          abi: lensHubArtifact.abi,
        },
      },
    },
  },
};

export default contracts;
