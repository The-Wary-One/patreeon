import { useForm } from "react-hook-form";

export default function SubscriptionForm({ currency, amount, onSubmit }) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const superfluidModuleData = {
    currency,
    amount,
  };

  return (
    <form onSubmit={handleSubmit(data => onSubmit({...superfluidModuleData, ...data }))}>
      <input {...register("profileId")} placeholder={"profileId"} />
      <input type="submit" value={"Subscribe"}/>
    </form>
  );
}
