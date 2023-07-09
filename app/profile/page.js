'use client'
import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const MyProfile = () => {
  const router = useRouter()
  const { data: session } = useSession({required : true});
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
    
      const response = await fetch(`api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };
     fetchPosts();
  }, []);
  const handleEdit = (id) => {
    router.push(`/update-prompt?id=${id}`)
  };
  const handleDelete = async (id) => {
    const hasConfimred = confirm('Are you want to delete this post!')
    if(hasConfimred){
      try {
        await fetch(`api/prompt/${id.toString()}`, {method : 'DELETE'})
        const filteredPosts = posts.filter((p)=> p._id !== id)
        setPosts(filteredPosts)
      } catch (error) {
        console.log(error)
      }
    }
  };
  return (
    <Profile
      posts={posts}
      name="My"
      desc="welcome to your personlized profile page"
      handleDelete={handleDelete}
      handleEdit={handleEdit}
    />
  );
};

export default MyProfile;
