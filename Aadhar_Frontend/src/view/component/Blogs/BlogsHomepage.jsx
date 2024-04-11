import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
 const BlogsHomepage=()=>{
    const [currentSlide, setCurrentSlide] = useState(0);
  const [blogs,setBlogs]=useState([]);
    const slides = [
      "https://khushii.org/wp-content/uploads/2021/07/slideb2-1.jpg",
      "https://thelogicalindian.com/h-upload/2020/01/27/149814-msr-youth-fb.jpg",
      "https://donate.smilefoundationindia.org/images/shiksha-na-ruke-9/Bb7rJpliYSQBKgx9WjSp1k3hOnkgUMWpXCFMloVo.jpg",
      "https://donate.smilefoundationindia.org/images/donate-for-healthcare/GSVWZndNBXbDReiUrjkSxbmkWTIwbGiupSwBQ2Bj.jpg",
      "https://donate.smilefoundationindia.org/images/donate-for-girl-child/YFf3huGJIdQ6M1cHhex9dxuAsHQsddkMMcu3bRRh.webp",
      "https://donate.smilefoundationindia.org/images/women-empowerment1/fjRxOG9m3XNZpqpni1AKSdVha54OavpVMjIXOfNp.webp",
      "https://www.humansofbombay.in/wp-content/uploads/2022/01/75-1.jpg"
 
    ];
  
    const nextSlide = () => {
      setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
    };
  
    const prevSlide = () => {
      setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
    };

    useEffect(()=>{
      fetch('http://localhost:5000/blogs/getAllBlogs')
      .then(res=>res.json())
      .then(data=>setBlogs(data)).catch(err=>console.log(err))
    },[])

    return(

    <div className="bg-gray-50">
    <div className="grid justify-center">
        <h1 className="text-center w-screen bg-gray-200 py-2 ">Welcome to <span className="text-orange-400 ">Aadhar's </span>Blog Page.</h1>
        
    </div>
        
    <div id="default-carousel" className="relative w-full max-w-screen-lg mx-auto">
    <div className="relative h-full md:h-96 overflow-hidden rounded-lg grid justify-center">
  {slides.map((slide, index) => (
    <div key={index} className={`absolute block w-full top-1/2 left-1/2 transform transition-transform duration-700 ease-in-out ${index === currentSlide ? '' : '-translate-x-full'}`}>
      <img src={slide} alt={`Slide ${index + 1}`} className="w-full h-full object-cover object-center transform -translate-x-1/2 -translate-y-1/2" />
    </div>
  ))}
</div>

  
  <button
    type="button"
    className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer focus:outline-none"
    onClick={prevSlide}
  >
    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 hover:bg-white/50 focus:ring-4 focus:ring-white focus:outline-none">
      <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 10">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
      </svg>
      <span className="sr-only">Previous</span>
    </span>
  </button>
  <button
    type="button"
    className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer focus:outline-none"
    onClick={nextSlide}
  >
    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 hover:bg-white/50 focus:ring-4 focus:ring-white focus:outline-none">
      <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 10">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
      </svg>
      <span className="sr-only">Next</span>
    </span>
  </button>
</div>

{/* cards */}
<div className="mt-5">
  {blogs.map(blog=>{
    return(
      <div className="max-w-md mx-auto bg-white shadow-md overflow-hidden rounded-lg m-2">
      <img className="w-full h-56 object-cover object-center" src={`http://localhost:5000/${blog.image}`} alt="..." />
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800">{blog.title}</h2>
        <p className="mt-2 text-gray-600">{blog.description}</p>
        <div className="mt-4">
          <Link
            to={`/blogs/${blog.id}`}
            className="text-indigo-500 inline-flex items-center font-semibold tracking-wide transition-colors duration-200 hover:text-indigo-600"
          >
            Read More
            <svg
              className="w-4 h-4 ml-2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              shapeRendering="geometricPrecision"
            >
              <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </Link>
        </div>
      </div>
    </div>  
       
    )
  })}
   

</div>
        </div>
  
    )
 }

 export default BlogsHomepage;