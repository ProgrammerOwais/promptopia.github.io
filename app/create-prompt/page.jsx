"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";
const CreatePrompt = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const { data: session } = useSession();
  const createPrompt = async (e) => {
    // console.log("before function executions");
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        }),
      });
      // console.log("response value is: ", response);
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log("the error in submitting post: ", error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Form
      type={"Create"}
      submitting={submitting}
      post={post}
      setPost={setPost}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
