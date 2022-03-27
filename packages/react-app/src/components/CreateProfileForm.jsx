import React from "react";
import { useForm } from "react-hook-form";
import { ethers } from "ethers";

function CreateProfileForm({ onSubmit, address }) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const profile = {
    to: address,
    handle: "",
    imageURI: "",
    // followModule: "0x8731324a6C09a1745bD15009Dc8FcceF11c05F4a",
    followModule: ethers.constants.AddressZero,
    followModuleData: [],
    followNFTURI: "",
  };

  return (
    <form onSubmit={handleSubmit(data => onSubmit({...profile, ...data }))}>
      <input {...register("handle")} placeholder={"handle"} />
      <input type="submit" value={"create"}/>
    </form>
  );
}

export default CreateProfileForm;
