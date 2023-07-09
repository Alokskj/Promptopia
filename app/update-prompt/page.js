"use client"
import Form from "@components/Form";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const UpdatePrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams()
  const promptId = searchParams.get('id')
  const { data : session } = useSession({required : true});
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  useEffect(()=>{
   const getPromptDetails = async () =>{
    const response = await fetch(`/api/prompt/${promptId}`)
    const data = await response.json()
    if(session?.user.id != data.creator._id){
        router.replace('/')
        return
    }
    setPost({
        prompt : data.prompt,
        tag : data.tag
    })
   }
   if(promptId) getPromptDetails()
  },[promptId])
  const UpdatePrompt = async (e) => {
    e.preventDefault();
    if(!promptId) return alert('Prompt ID not found')
    setSubmitting(true);
    try {
        const response = await fetch(`/api/prompt/${promptId}`, {
            method: "PATCH",
            body: JSON.stringify({
                prompt: post.prompt,
                tag: post.tag,
                
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
      type="Update"
      post={post}
      handleSubmit={UpdatePrompt}
      submitting={submitting}
      setPost={setPost}
    />
  );
};

export default UpdatePrompt;
