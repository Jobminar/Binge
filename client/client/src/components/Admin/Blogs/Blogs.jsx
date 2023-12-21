// Blog.js

import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Blogs.css";

const Blog = () => {
  // Sample blog data
  const blogData = [
    {
      id: 1,
      image: "url_to_image1",
      title: "Blog Post 1",
      description: "This is the description for Blog Post 1.",
    },
    {
      id: 2,
      image: "url_to_image2",
      title: "Blog Post 2",
      description: "This is the description for Blog Post 2.",
    },
    {
      id: 3,
      image: "url_to_image3",
      title: "Blog Post 3",
      description: "This is the description for Blog Post 3.",
    },
    {
      id: 4,
      image: "url_to_image4",
      title: "Blog Post 4",
      description: "This is the description for Blog Post 4.",
    },
    {
      id: 5,
      image: "url_to_image5",
      title: "Blog Post 5",
      description: "This is the description for Blog Post 5.",
    },
    // Add more blog posts as needed
  ];

  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <div className="blog-container">
      <div className="grid-button" id="grid-button" onClick={handleHomeClick}>
        <FaHome className="home-icon" />
      </div>
      <div className="blog-header">
        <h1>BLOG</h1>
      </div>
      <div className="blog-scroll-container">
        {blogData.map((post) => (
          <div className="blog-card" key={post.id}>
            <img src={post.image} alt={`Blog Post ${post.id}`} />
            <div className="blog-content">
              <h2>{post.title}</h2>
              <p>{post.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
