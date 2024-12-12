import React from "react";
import user1 from "../assets/user1.png";
import user2 from "../assets/user2.png";
import user3 from "../assets/user3.png";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: "Francis Guzman",
    role: "Designer",
    image: user1,
    rating: 5,
    feedback:
      "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.",
  },
  {
    id: 2,
    name: "Wilma Taylor",
    role: "Designer",
    image: user2,
    rating: 4,
    feedback:
      "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.",
  },
  {
    id: 3,
    name: "Mandy Owens",
    role: "Designer",
    image: user3,
    rating: 5,
    feedback:
      "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.",
  },
  {
    id: 4,
    name: "Emily Johnson",
    role: "Designer",
    image: user3,
    rating: 5,
    feedback:
      "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.",
  },
  {
    id: 5,
    name: "John Doe",
    role: "Designer",
    image: user3,
    rating: 4,
    feedback:
      "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.",
  },
];

const Testimonials = () => {
  const scrollContainer = React.useRef(null);

  const handleScroll = (direction) => {
    if (scrollContainer.current) {
      const scrollAmount = 300; // Adjust based on how much you want to scroll
      scrollContainer.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-gray-50 py-10">
      <div className="max-w-[95rem] mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">What our Clients say</h2>
        <div className="flex items-center justify-center space-x-4">
          <button
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600"
            onClick={() => handleScroll("left")}
          >
            <FaArrowLeft />
          </button>
          <div
            ref={scrollContainer}
            className="flex space-x-6 overflow-x-scroll scrollbar-hide snap-x snap-mandatory"
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="rounded-lg shadow-lg p-6 text-left snap-start h-[19rem] mb-4"
                style={{ flex: "0 0 300px" }} // Adjust the width as needed
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="font-bold text-lg">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  {Array.from({ length: testimonial.rating }).map(
                    (_, index) => (
                      <span
                        key={index}
                        className="text-yellow-500"
                        aria-label="Star"
                      >
                        ★
                      </span>
                    )
                  )}
                  {Array.from({ length: 5 - testimonial.rating }).map(
                    (_, index) => (
                      <span
                        key={index + testimonial.rating}
                        className="text-gray-300"
                        aria-label="Empty Star"
                      >
                        ★
                      </span>
                    )
                  )}
                </div>
                <p className="text-sm text-gray-600">{testimonial.feedback}</p>
              </div>
            ))}
          </div>
          <button
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600"
            onClick={() => handleScroll("right")}
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
