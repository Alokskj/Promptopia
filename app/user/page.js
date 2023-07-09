'use client'
import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { useRouter , useSearchParams} from "next/navigation";
import React, { useEffect, useState } from "react";

const UserProfile = () => {
  const searchParams = useSearchParams()
  const userName = searchParams.get('name')
  const capitalizedUserName = userName.replace(
    /\b\w/g,
    (char) => char.toUpperCase()
  );
  
  const userId = searchParams.get('id')
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
    
      const response = await fetch(`api/users/${userId}/posts`);
      const data = await response.json();
      
      setPosts(data);
    };
     fetchPosts();
  }, []);

  return (
    <Profile
      posts={posts}
      name={capitalizedUserName}
      desc={`welcome to ${capitalizedUserName} profile page`}
    />
  );
};

export default UserProfile;
