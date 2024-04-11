import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const SingleBlogpage = () => {
    const [singleblog, setBlog] = useState({});
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:5000/blogs/getOneBlog/${id}`)
        .then(res => res.json())
        .then(data => setBlog(data))
        .catch(err => console.log(err));
    }, [id]);

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="max-w-xl mx-auto p-8 bg-white shadow-md rounded-lg">
                <img className="w-full h-56 object-cover object-center" src={`http://localhost:5000/${singleblog.image}`} alt={singleblog.title} />
                <div className="p-4">
                    <span className="text-xs font-medium text-gray-500 uppercase">{singleblog.category}</span>
                    <h2 className="mt-2 text-lg font-semibold text-gray-800">{singleblog.title}</h2>
                    <p className="mt-2 text-sm text-gray-600">{singleblog.description}</p>
                    <div className="flex items-center mt-4">
                        <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                        </svg>
                        <span className="ml-1 text-xs text-gray-500">Uploaded on {singleblog.createdAt}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleBlogpage;
