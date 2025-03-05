
import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';
import { useRef } from 'react';

function App() {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null); 
  const loadingRef = useRef();
const fetchImages = async ({limit = 5}) => {
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
fetchImages({ limit: 5 });
},[page]);

useEffect(() => {
  if(!loadingRef.current) return;
  const loadingObserver = new IntersectionObserver(([entry]) => {
    if(entry.isIntersecting){
      setPage((page) => page + 1)
    }
  },
  {threshold: 1}
);
loadingObserver.observe(loadingRef.current);
return() => {
  if(loadingRef.current) loadingObserver.unobserve(loadingRef.current)
}
},[posts])
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
