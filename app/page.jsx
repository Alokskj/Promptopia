import Feed from '@components/Feed'
import React from 'react'

const Home = () => {
  return (
    <section className='w-full flex-center flex-col'>
        <h1 className="head_text text-center">
            Discover & Share
            <br className='max-md:hidden'/>
            <span className='orange_gradient'> AI-Powred Prompts</span>

        </h1>
        <p className='desc text-center'>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium cupiditate eos iste a laudantium magni quo exercitationem ut ipsa illo.
        </p>
        <Feed />
    </section>
  )
}

export default Home