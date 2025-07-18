import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FaStar, FaRegStar } from "react-icons/fa";

const reviewData = [
  {
    id: 1,
    name: "Sarah Ajayi",
    review:
      "I had a medical emergency at night and Medilus responded within 10 minutes. The doctor came to my house and treated me professionally. I'm now fully recovered.",
    rating: 5,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK3sxTX93q_Epz4a96KRHIl4nMdLm22wcdzA&s",
    location: "Lagos, Nigeria",
  },
  {
    id: 2,
    name: "Emeka Obi",
    review:
      "Booked a doctor for my dad through Mediplus. The doctor arrived on time, diagnosed properly, and gave effective treatment. Excellent service!",
    rating: 5,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIJzJUCo-RpJB0V8hJcNhjHSbddEkvk5hZJw&s",
    location: "Enugu, Nigeria",
  },
  {
    id: 3,
    name: "Amina Yusuf",
    review:
      "I was able to walk in anytime after booking a doctor. No delays, and the doctor was kind and knowledgeable. I got treated and felt better within a day.",
    rating: 4,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFcccKNqXWCKdFIiJhndpIfWw_I8hfzbM7rQ&s",
    location: "Abuja, Nigeria",
  },
  {
    id: 4,
    name: "David Okonkwo",
    review:
      "I love that Medilus allows you to book the same doctor again. They had my past record and continued my treatment smoothly. Very efficient system.",
    rating: 5,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVWMGEQpkqHpZOV0MesmdtTKwxKfgloOBUnA&s",
    location: "Port Harcourt, Nigeria",
  },
  {
    id: 5,
    name: "Ngozi Eze",
    review:
      "I had a sudden allergic reaction and used Mediplus for emergency care. The response was quick, and the treatment saved me. Forever grateful!",
    rating: 5,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFcccKNqXWCKdFIiJhndpIfWw_I8hfzbM7rQ&s",
    location: "Ibadan, Nigeria",
  },
];

const ReviewCarousel = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1280 },
      items: 2,
    },
    desktop: {
      breakpoint: { max: 1280, min: 768 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="container bg-white flex flex-col gap-12 py-16">
      <div className="flex text-center flex-col gap-4 items-center justify-center">
  <h2 className="font-bold">What Our Patients Are Saying</h2>
  <p className="text-[#999999] max-w-4xl">
    Real feedback from patients who have experienced our care. Discover their stories and testimonials about the quality of our services and medical team.
  </p>
</div>


      <Carousel responsive={responsive}>
        {reviewData.map((review) => (
          <div
            key={review.id}
            className="bg-white shadow-lg rounded-lg p-5 mx-2 border"
          >
            <div className="flex flex-col items-center gap-4 mb-3 ">
              <img
                src={review.image}
                alt={review.name}
                className="w-24 h-24 rounded-full object-cover"
              />
             <h3 className="text-lg font-bold">{review.name}</h3>

<p className="text-base text-gray-800 font-semibold leading-relaxed mt-2">
  &apos;{review.review}&apos;
</p>

            </div>

            {/* <p className="text-sm text-gray-800 font-medium leading-relaxed">
              "{review.review}"
            </p> */}

            <div className="mt-3 text-yellow-500 flex items-center gap-1 text-sm">
              {Array.from({ length: 5 }).map((_, index) =>
                index < review.rating ? (
                  <FaStar key={index} />
                ) : (
                  <FaRegStar key={index} />
                )
              )}
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ReviewCarousel;
