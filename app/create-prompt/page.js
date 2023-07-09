"use client"
import Form from "@components/Form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const CreatePrompt = () => {
  const router = useRouter();
  const { data : session } = useSession({required : true});
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setSubmitting(true);
    try {
        const response = await fetch("api/prompt/new", {
            method: "POST",
            body: JSON.stringify({
                prompt: post.prompt,
                tag: post.tag,
                userId: session?.user.id,
            }),
        });
        
      if (response.ok) {
        router.push('/')
      }
    } catch (error) {
        console.log(error)
    } finally {
        setSubmitting(false)
    }
  };
  return (
    <Form
      type="Create"
      post={post}
      handleSubmit={handleSubmit}
      submitting={submitting}
      setPost={setPost}
    />
  );
};

export default CreatePrompt;
