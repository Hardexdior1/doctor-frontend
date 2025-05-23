"use client";
import Image from "next/image";
import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const Testimonials = () => {
  return (
    <div className="carousel-container hidden md:block bg-white  md:mt-10 md:px-0">
      <Splide
        options={{
          type: "loop",
          perPage: 1,
          perMove: 1,
          gap: "1rem",
          pagination: false,
          autoplay: true,
          pauseOnHover: true,
          interval: 3000,
          breakpoints: {
            768: {
              perPage: 1,
              gap: "0.5rem",
            },
            1024: {
              perPage: 2,
            },
          },
        }}>
        <SplideSlide>
          <div className=" w-full flex flex-col items-center justify-center text-white p-4">
            <Image
              src="https://via.placeholder.com/60"
              alt="Reviewer"
              className="rounded-full w-16 h-16 mb-3"
            />
            <h3 className="font-semibold text-lg text-black">Jane Doe</h3>
            <div className="flex items-center gap-1 my-2">
              <span>⭐⭐⭐⭐⭐</span>
            </div>
            <p className="text-center">
              I cannot recommend this cleaning service highly enough. From the
              moment I reached out to book an appointment, their professionalism
              was evident. The customer service team was polite, efficient, and
              ensured that they understood my needs in detail. When the cleaning
              team arrived, they were punctual and came equipped with everything
              needed for the job
            </p>
          </div>
        </SplideSlide>
        <SplideSlide>
          <div className=" w-full flex flex-col items-center justify-center text-white p-4">
            <Image
              src="https://via.placeholder.com/60"
              alt="Reviewer"
              className="rounded-full w-16 h-16 mb-3"
            />
            <h3 className="font-semibold text-black text-lg">John Smith</h3>
            <div className="flex items-center gap-1 my-2">
              <span>⭐⭐⭐⭐⭐</span>
            </div>
            <p className="text-center text-sm">
              This cleaning company exceeded my expectations. From scheduling to
              execution, the process was seamless. The staff was courteous and
              asked detailed questions to ensure everything I needed was
              covered. They even confirmed my preferred cleaning products
            </p>
          </div>
        </SplideSlide>
        <SplideSlide>
          <div className=" w-full flex flex-col items-center justify-center text-white p-4">
            <Image
              src="https://via.placeholder.com/60"
              alt="Reviewer"
              className="rounded-full w-16 h-16 mb-3"
            />
            <h3 className="font-semibold text-black text-lg">Emily Johnson</h3>
            <div className="flex items-center gap-1 my-2">
              <span>⭐⭐⭐⭐⭐</span>
            </div>
            <p className="text-center text-sm">
              I had a wonderful experience with this cleaning service. Booking
              was easy, and they were quick to respond to my inquiries. The team
              arrived right on time and worked efficiently to clean my entire
              house. The attention to detail was impressive—they didn’t miss a
              spot! I also appreciated their professionalism and respect for my
              home. Everything was left smelling fresh and looking great
            </p>
          </div>
        </SplideSlide>
      </Splide>
    </div>
  );
};

export default Testimonials;
