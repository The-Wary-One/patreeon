import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { ThemeProvider } from "@mui/material/styles";
import { Box, Typography, Container } from "@mui/material";
import { styled } from "@mui/system";
import {
  useBalance,
  useContractLoader,
  useContractReader,
  useGasPrice,
  useOnBlock,
  useUserProviderAndSigner,
} from "eth-hooks";

import { NETWORKS } from "./scaffold-eth/packages/react-app/src/constants";
import useStaticJsonRPC from "./scaffold-eth/packages/react-app/src/hooks/useStaticJsonRPC";
import Transactor from "./scaffold-eth/packages/react-app/src/helpers/Transactor";
// contracts
import deployedContracts from "./contracts/hardhat_contracts";

import theme from "./theme";
import flowerPicture from "./assets/flowerpic.jpg";
import flowerPicture2 from "./assets/flowerpic2.jpg";
import PatreeonCard from "./components/PatreeonCard";
import TopBar from "./components/TopBar";

import Account from "./scaffold-eth/packages/react-app/src/components/Account.jsx";

const MainContainer = styled(Box)({
  height: "100vh",
});

const StyledContainer = styled(Container)({
  marginTop: theme.spacing(6),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(4),
});

const StyledCardContainer = styled(Box)({
  display: "flex",
  gap: theme.spacing(3),
});

/// 📡 What chain are your contracts deployed to?
const initialNetwork = NETWORKS.localhost; // <------- select your target frontend network (localhost, rinkeby, xdai, mainnet)

const DEBUG = true;
const NETWORKCHECK = true;
const USE_BURNER_WALLET = true; // toggle burner wallet feature
const USE_NETWORK_SELECTOR = false;

// const web3Modal = Web3ModalSetup();

// 🛰 providers
const providers = [
  // "https://eth-mainnet.gateway.pokt.network/v1/lb/611156b4a585a20035148406",
  // `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_KEY}`,
  // "https://rpc.scaffoldeth.io:48544",
];

function App(props) {
  // specify all the chains your app is available on. Eg: ['localhost', 'mainnet', ...otherNetworks ]
  // reference './constants.js' for other networks
  const networkOptions = [initialNetwork.name, "mainnet", "rinkeby"];

  const [injectedProvider, setInjectedProvider] = useState();
  const [address, setAddress] = useState();
  const [selectedNetwork, setSelectedNetwork] = useState(networkOptions[0]);
  // const location = useLocation();

  const targetNetwork = NETWORKS[selectedNetwork];

  // 🔭 block explorer URL
  const blockExplorer = targetNetwork.blockExplorer;

  // load all your providers
  const localProvider = useStaticJsonRPC([
    process.env.REACT_APP_PROVIDER
      ? process.env.REACT_APP_PROVIDER
      : targetNetwork.rpcUrl,
  ]);
  const mainnetProvider = useStaticJsonRPC(providers);

  if (DEBUG) console.log(`Using ${selectedNetwork} network`);

  // 🛰 providers
  if (DEBUG) console.log("📡 Connecting to Mainnet Ethereum");

  // const logoutOfWeb3Modal = async () => {
  //   await web3Modal.clearCachedProvider();
  //   if (
  //     injectedProvider &&
  //     injectedProvider.provider &&
  //     typeof injectedProvider.provider.disconnect == "function"
  //   ) {
  //     await injectedProvider.provider.disconnect();
  //   }
  //   setTimeout(() => {
  //     window.location.reload();
  //   }, 1);
  // };

  /* 💵 This hook will get the price of ETH from 🦄 Uniswap: */
  // const price = useExchangeEthPrice(targetNetwork, mainnetProvider);

  /* 🔥 This hook will get the price of Gas from ⛽️ EtherGasStation */
  const gasPrice = useGasPrice(targetNetwork, "fast");
  // Use your injected provider from 🦊 Metamask or if you don't have it then instantly generate a 🔥 burner wallet.
  const userProviderAndSigner = useUserProviderAndSigner(
    injectedProvider,
    localProvider,
    USE_BURNER_WALLET
  );
  const userSigner = userProviderAndSigner.signer;

  useEffect(() => {
    async function getAddress() {
      if (userSigner) {
        const newAddress = await userSigner.getAddress();
        setAddress(newAddress);
      }
    }
    getAddress();
  }, [userSigner]);

  // You can warn the user if you would like them to be on a specific network
  const localChainId =
    localProvider && localProvider._network && localProvider._network.chainId;
  const selectedChainId =
    userSigner &&
    userSigner.provider &&
    userSigner.provider._network &&
    userSigner.provider._network.chainId;

  // For more hooks, check out 🔗eth-hooks at: https://www.npmjs.com/package/eth-hooks

  // The transactor wraps transactions and provides notificiations
  const tx = Transactor(userSigner, gasPrice);

  // 🏗 scaffold-eth is full of handy hooks like this one to get your balance:
  const yourLocalBalance = useBalance(localProvider, address);

  // Just plug in different 🛰 providers to get your balance on different chains:
  const yourMainnetBalance = useBalance(mainnetProvider, address);

  // const contractConfig = useContractConfig();

  const contractConfig = {
    deployedContracts: deployedContracts || {},
    externalContracts: {},
  };

  // Load in your local 📝 contract and read a value from it:
  const readContracts = useContractLoader(localProvider, contractConfig);

  // If you want to make 🔐 write transactions to your contracts, use the userSigner:
  const writeContracts = useContractLoader(
    userSigner,
    contractConfig,
    localChainId
  );

  //
  // 🧫 DEBUG 👨🏻‍🔬
  //
  useEffect(() => {
    if (
      DEBUG &&
      mainnetProvider &&
      address &&
      selectedChainId &&
      yourLocalBalance &&
      yourMainnetBalance &&
      readContracts &&
      writeContracts
      // mainnetContracts
    ) {
      console.log(
        "_____________________________________ 🏗 scaffold-eth _____________________________________"
      );
      console.log("🌎 mainnetProvider", mainnetProvider);
      console.log("🏠 localChainId", localChainId);
      console.log("👩‍💼 selected address:", address);
      console.log("🕵🏻‍♂️ selectedChainId:", selectedChainId);
      console.log(
        "💵 yourLocalBalance",
        yourLocalBalance ? ethers.utils.formatEther(yourLocalBalance) : "..."
      );
      console.log(
        "💵 yourMainnetBalance",
        yourMainnetBalance
          ? ethers.utils.formatEther(yourMainnetBalance)
          : "..."
      );
      console.log("📝 readContracts", readContracts);
      // console.log("🌍 DAI contract on mainnet:", mainnetContracts);
      // console.log("💵 yourMainnetDAIBalance", myMainnetDAIBalance);
      console.log("🔐 writeContracts", writeContracts);
    }
  }, [
    mainnetProvider,
    address,
    selectedChainId,
    yourLocalBalance,
    yourMainnetBalance,
    readContracts,
    writeContracts,
    // mainnetContracts,
    localChainId,
    // myMainnetDAIBalance,
  ]);

  const faucetAvailable =
    localProvider &&
    localProvider.connection &&
    targetNetwork.name.indexOf("local") !== -1;

  return (
    <ThemeProvider theme={theme}>
      <MainContainer>
        <TopBar />
        <Account useBurner localProvider={localProvider} />

        <StyledContainer maxWidth="xl">
          <Typography variant="h1">Welcome to Patreeon</Typography>
          <StyledCardContainer>
            <PatreeonCard
              picture={flowerPicture}
              title="Tibo mimi"
              description="description voila voila hello"
            />
            <PatreeonCard
              picture={flowerPicture2}
              title="Tibo mimi"
              description="description voila voila hello reee errrr re reeee"
            />
          </StyledCardContainer>
        </StyledContainer>
      </MainContainer>
    </ThemeProvider>
  );
}

export default App;
