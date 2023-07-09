import React from "react";
import PromptCard from "./PromptCard";

const Profile = ({ posts, name, desc, handleDelete, handleEdit }) => {
  return (
    <section className="w-full">
        <h1 className="head_text text-left"><span className="blue_gradient">{name} Profile</span></h1>
        <p className="desc text-left">{desc}</p>
        <div className="prompt_layout mt-16">
        {posts?.map((item)=>{
            return (
                <PromptCard 
                key={item._id}
                post={item}
                
                handleDelete={()=> handleDelete && handleDelete(item._id)}
                handleEdit={()=> handleEdit && handleEdit(item._id)}
                />
            )
        })}
      </div>
    </section>
  );
};

export default Profile;
