import React from 'react'
import BlogCard from '../components/BlogCard'
import { useLoaderData } from 'react-router-dom'

export async function homeLoader() {
  
  try {
    const res = await fetch("http://localhost:4000/post");
    const posts = await res.json();
    return posts;
  } catch (err) {
    throw new Error("Server error , Try again later!")
  }
}


const Home = () => {
  const posts = useLoaderData()

  return (
    <>
    {posts.length > 0 && posts.map(post=> <BlogCard key={post._id} {...post} />)}
    </>
  )
}

export default Home