import { useForm } from "react-hook-form";

export default function CreatePostForm({ profile, onSubmit, collectModule, referenceModule }) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const post = {
    profileId: "",
    contentURI: "data:text/plain;base64,SGVsbG8sIFdvcmxkIQ==",
    collectModule,
    collectModuleData: [],
    referenceModule,
    referenceModuleData: []
  };

  return (
    <form onSubmit={handleSubmit(data => onSubmit({...post, ...data }))}>
      <input {...register("profileId")} placeholder={"profileId"} />
      <input type="submit" value={"create"}/>
    </form>
  )
}
