import lensHubArtifact from "./generated/contracts/core/LensHub.sol/LensHub.json";
import superfluidCFAFollowModuleArtifact from "./generated/contracts/core/modules/follow/SuperfluidCFAFollowModule.sol/SuperfluidCFAFollowModule.json";
import followerOnlyReferenceModuleArtifact from "./generated/contracts/core/modules/reference/FollowerOnlyReferenceModule.sol/FollowerOnlyReferenceModule.json";
import emptyCollectModuleArtifact from "./generated/contracts/core/modules/collect/EmptyCollectModule.sol/EmptyCollectModule.json";
import currencyArtifact from "./generated/contracts/mocks/Currency.sol/Currency.json";

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
        SuperfluidCFAFollowModule: {
          address: process.env.REACT_APP_SUPERFLUID_CFA_FOLLOW_MODULE,
          abi: superfluidCFAFollowModuleArtifact.abi,
        },
        FollowerOnlyReferenceModule: {
          address: process.env.REACT_APP_FOLLOWER_ONLY_REFERENCE_MODULE_ADDRESS,
          abi: followerOnlyReferenceModuleArtifact.abi,
        },
        EmptyCollectModule: {
          address: process.env.REACT_APP_EMPTY_COLLECT_MODULE_ADDRESS,
          abi: emptyCollectModuleArtifact.abi,
        },
        Currency: {
          address: process.env.REACT_APP_CURRENCY_ADDRESS,
          abi: currencyArtifact.abi,
        },
      },
    },
  },
};

export default contracts;
