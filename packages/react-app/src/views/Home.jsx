import { ethers } from "ethers";
import React, { useState } from "react";

import { CreateProfileForm, CreatePostForm, SubscriptionForm } from "../components";

const DEFAULT_SUBSCRIPTION_FEE = ethers.utils.parseEther("1");

function Home({ localProvider, writeContracts, tx, address, sf }) {
  const [profile, setProfile] = useState({});
  const [post, setPost] = useState({});

  return (
    <div>
      <p>Patreeon demo. Please follow the following instructions 🐸</p>
      <br/>
      <p>1. Create a Lens profile (USER1)</p>
      <CreateProfileForm
        address={address}
        onSubmit={async data => {
          const lensHubGovernance = await localProvider.getSigner(1);
          const result = tx(writeContracts.LensHub.connect(lensHubGovernance).createProfile(data), async update => {
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
              const profileId = await writeContracts.LensHub.getProfileIdByHandle(data.handle);
              const profile = { ...data, id: profileId.toString() };
              console.log("profile: ", profile);
              setProfile(profile);
            }
          });
          console.log("awaiting metamask/web3 confirm result...", result);
          console.log(await result);
        }}
      />
      {profile?.id && <p>Your profile id is: {profile.id.toString()}</p>}
      <br/>
      <p>2. Create a post</p>
      <CreatePostForm
        profile={profile}
        collectModule={writeContracts.EmptyCollectModule?.address}
        referenceModule={writeContracts.FollowerOnlyReferenceModule?.address}
        onSubmit={async data => {
          const result = tx(writeContracts.LensHub.post(data), async update => {
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
              const postId = await writeContracts.LensHub.getPubCount(data.profileId);
              const post = { ...data, id: postId };
              console.log("post: ", post);
              setPost(post);
            }
          });
          console.log("awaiting metamask/web3 confirm result...", result);
          console.log(await result);
        }}
      />
      {post?.id && <p>Your post id is: {post.id.toString()}</p>}
      <br/>
      <p>3. Create a new user (i.e. USER2) by opening this app in a private window and create a profile with 1.</p>
      <br/>
      <p>4. Try to comment on USER1 post. It should fail because you need to subscribe to them first!</p>

      <br/>
      <p>5. Subscribe to them. It will first create a constant flow agreement to them using superfluid then it will follow them on Lens</p>
      <SubscriptionForm
        currency={writeContracts.Currency?.address}
        amount={DEFAULT_SUBSCRIPTION_FEE}
        onSubmit={async data => {
          const lensHubGovernance = await localProvider.getSigner(1);
          const currency = await sf.loadSuperToken(writeContracts.Currency.address);
          const tx1 = await currency.transfer({ to: address, amount: ethers.utils.parseEther("10") }).exec(lensHubGovernance);
          await tx1.wait();
          const recipient = await writeContracts.SuperfluidCFAFollowModule.getProfileData(data.profileId);
          console.log("recipient", recipient);
          //await sf.cfaV1.createFlow({
          //  sender: address,
          //  receiver,
          //})
          //const result = tx(writeContracts.Currency.connect(lensHubGovernance).transfer(address, ethers.utils.parseEther("10")), async update => {
          //  console.log("📡 Transaction Update:", update);
          //  if (update && (update.status === "confirmed" || update.status === 1)) {
          //    console.log(" 🍾 Transaction " + update.hash + " finished!");
          //    console.log(
          //      " ⛽️ " +
          //        update.gasUsed +
          //        "/" +
          //        (update.gasLimit || update.gas) +
          //        " @ " +
          //        parseFloat(update.gasPrice) / 1000000000 +
          //        " gwei",
          //    );
          //    const post = { ...data, id: postId };
          //    console.log("post: ", post);
          //    setPost(post);
          //  }
          //});
          //console.log("awaiting metamask/web3 confirm result...", result);
          //console.log(await result);
        }}
      />
      <br/>
      <p>6. Now you comment on USER1 post using 4.</p>
    </div>
  );
}

export default Home;
