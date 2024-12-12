import React from "react";
import { FaArrowRight } from "react-icons/fa";
import image1 from "../assets/1.png";
import image2 from "../assets/2.png";
import image3 from "../assets/3.png";

const BlogCard = ({ image, title, description }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105">
      <div className="relative">
        <img src={image} alt="Blog" className="w-full object-cover" />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <p className="text-gray-600 mt-2 text-sm">{description}</p>
        <div className="mt-4">
          <button className="flex items-center text-blue-500 font-medium hover:underline">
            READ MORE <FaArrowRight className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

const Blog = () => {
  const blogs = [
    {
      image: image1,
      title: "Lorem ipsum is placeholder text commonly used in the graphic...",
      description:
        "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web...",
    },
    {
      image: image2,
      title:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do...",
      description:
        "The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled...",
    },
    {
      image: image3,
      title: "Excepteur sint occaecat cupidatat non proident, sunt in...",
      description:
        "Parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with...",
    },
  ];


  return (
    <div className="bg-gray-50 py-12">
      <div className=" container mx-auto px-[5rem]">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Our Blogs
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[7rem] ">
          {blogs.map((blog, index) => (
            <BlogCard
              key={index}
              image={blog.image}
              title={blog.title}
              description={blog.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
