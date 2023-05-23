"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  // console.log(post);
  const [copied, setCopied] = useState("");
  const { data: session } = useSession();
  const pathName = usePathname();
  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  };
  const url = new URL(window.location.href);

  return (
    <div className="prompt_card">
      <div
        className="flex flex-between items-start gap-5"
        onClick={() => {
          if (post.creator.email != session?.user.email)
            alert("Sorry You Can't Open other Users Profile");
        }}
      >
        <Link
          href={post.creator.email == session?.user.email ? "/profile" : "/"}
        >
          <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
            <Image
              src={post.creator.image}
              className="rounded-full object-contain"
              width={40}
              height={40}
              alt="user_image"
            />

            <div className="flex flex-col">
              <h3 className="font-satoshi font-semibold text-gray-900">
                {" "}
                {post.creator.username}
              </h3>
              <p className="font-inter text-sm text-gray-500">
                {post.creator.email}
              </p>
            </div>
          </div>
        </Link>
      </div>{" "}
      <div className="copy_btn absolute right-1 top-1" onClick={handleCopy}>
        <Image
          src={
            copied === post.prompt
              ? "/assets/icons/tick.svg"
              : "/assets/icons/copy.svg"
          }
          alt={"copied logo"}
          width={12}
          height={12}
        />
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </p>
      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex-center border-t pt-3 gap-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer "
            onClick={handleEdit}
          >
            Edit
          </p>{" "}
          <p
            className="font-inter text-sm orange_gradient cursor-pointer "
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};
export default PromptCard;
