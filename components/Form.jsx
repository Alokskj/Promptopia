import Link from "next/link";
import React from "react";

const Form = ({
  type,
  post,
  handleSubmit,
  submitting,
  setPost
}) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share your Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Nobis, dolores molestias!
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base textgray700">
            Your AI prompt
          </span>
          <textarea
            className="form_textarea"
            value={post.prompt}
            onChange={(e) => {
              setPost({ ...post, prompt: e.target.value });
            }}
            placeholder="write your prompt here"
            required
          ></textarea>
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base textgray700">
            Tag <span>(#product, #webdevelopment, #idea)</span>
          </span>
          <input
            className="form_input"
            value={post.tag}
            onChange={(e) => {
              setPost({ ...post, tag: e.target.value });
            }}
            placeholder="#tag"
            required
          ></input>
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
        <Link href={'/'} className="text-gray-500 text-sm">Cancel</Link>
        <button disabled={submitting} className="px-5 py-1.5 text-sm rounded-full bg-primary-orange text-while" type="submit">
            {submitting ? `${type}...` : type}
        </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
