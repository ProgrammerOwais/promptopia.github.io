"use client";
import { useState, useEffect } from "react";
// import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
// useSearchParams is used to get the parameters from search bar
import Form from "@components/Form";
const EditPrompt = () => {
  const searchParams = useSearchParams();
  const paramId = searchParams.get("id");
  // Get the current browser URL
  //   const url = new URL(window.location.href);

  // Extract the value of the 'id' parameter from the URL
  //   const paramId = url.searchParams.get("id");

  //   const paramId = "646793daac92d5581ab9b57e";
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  console.log("the params id is; ", paramId);
  useEffect(() => {
    const displayData = async () => {
      const response = await fetch(`/api/prompt/${paramId}`);
      const data = await response.json();
      setPost({ prompt: data.prompt, tag: data.tag });
    };
    if (paramId) displayData();
  }, [paramId]);

  //   const { data: session } = useSession();
  const updatePrompt = async (e) => {
    // console.log("before function executions");
    e.preventDefault();
    setSubmitting(true);
    try {
      if (!paramId) return alert("the prompt is not found");
      const response = await fetch(`/api/prompt/${paramId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      //   console.log("response value is: ", response);
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      //   console.log("the error in submitting post: ", error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Form
      type={"Edit"}
      submitting={submitting}
      post={post}
      setPost={setPost}
      handleSubmit={updatePrompt}
    />
  );
};

export default EditPrompt;
