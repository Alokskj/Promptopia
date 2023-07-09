'use client'
import React, { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const Feed = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [posts, setPosts] = useState([])

  useEffect(()=>{
    const fetchPosts = async ()=>{
        const response = await fetch('api/prompt')
        const data = await response.json()
        setPosts(data)
    }
    fetchPosts()
   
  },[])
  useEffect(() => {
    const filtered = posts.filter((post) => {
      const { creator : {username}, prompt, tag } = post;
      const lowerCaseQuery = searchQuery.toLowerCase();
  
      return (
        username.toLowerCase().includes(lowerCaseQuery) ||
        prompt.toLowerCase().includes(lowerCaseQuery) ||
        tag.toLowerCase().includes(lowerCaseQuery)
      );
    });
  
    setFilteredPosts(filtered);
  }, [searchQuery, posts]);


  const handleTagClick = (tagname) => {
    setSearchQuery(tagname)

  }
 
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search For a Tag or Username"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          required
          className="search_input peer"
        />
      </form>
      <div className="prompt_layout mt-16">
        {filteredPosts?.map((item)=>{
          
            return (
                <PromptCard 
                key={item._id}
                post={item}
                handleTagClick={handleTagClick}
                
                />
            )
        })}
      </div>
    </section>
  );
};

export default Feed;
