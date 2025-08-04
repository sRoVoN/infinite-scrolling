
import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';
import { useRef } from 'react';
import useInfiniteScroll from './hook/useInfiniteScroll';

function App() {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null); 
  const loadingRef = useRef();
const fetchPosts = async ({limit = 5}) => {
  try {
    
    const url = `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`;

    const response = await fetch(url);
    if(!response.ok){
      throw new Error("Faild to fetch data")
    }
    const data = await response.json();
    if (data.length > 0) {
      setPosts((prevPosts) => [...prevPosts, ...data]); 
      setError(null); 
    } else {
      console.log("No posts found"); 
    }
  } catch (error) {
    setError(error.message);
  }  
 
}
useEffect(() => {
fetchPosts({ limit: 5 });
},[page]);

useInfiniteScroll(loadingRef, () => setPage((prev) => prev + 1 , [posts] ));
  return (
    <>
     {error && <div className="error">{error}</div>} 
    {posts.length > 0 ? (
        posts.map((post, index) => (
          <div key={index} className='post'>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))
      ) : (
        <p>No posts available.</p>
      )}
      <div ref={loadingRef}>Loading</div>
    </>
  )
}

export default App
