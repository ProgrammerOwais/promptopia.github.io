"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Profile from "@components/Profile";
const UserProfile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  const handleEdit = async (post) => {
    router.push(`/update-prompt?=${post._id}`);
  };
  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are sure, do you want to delete the prompt");
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, { method: "DELETE" });
        const filterdPost = posts.filter((p) => p._id !== post._id);
        setPosts(filterdPost);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };
    if (session?.user.id) {
      fetchPosts();
      //   console.log("the uploaded profile data is: ", posts);
      //   console.log("the function is executed");
    }
  }, [session?.user.id]);

  //   console.log("the uploaded profile data is: ", posts);
  return (
    // <div> check data </div>
    <Profile
      name="my"
      desc="Welcome to my promtopia profile"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default UserProfile;
