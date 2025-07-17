import React from "react";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import slide1 from "/hero.webp";
import slide2 from "./hero.webp";
import slide3 from "./hero.webp";
import "swiper/css";
import Link from "next/link";
import Image from "next/image";
const SliderComponent = () => {
  const data = [
    {
      id: 1,
      name: "Whether you need a space to work, rest, or something in between — we’ve got you covered.",
      sub_text: "Enjoy flexible comfort, serene privacy, and modern amenities for whatever your stay demands.",
      img: slide1,
    },
    {
      id: 2,
      name: "Experience comfort, convenience, and class — all in one place",
      sub_text: "From our premium rooms to our top-notch service, everything is designed for your satisfaction.",
      img: slide2,
    },
    {
      id: 3,
      name: "More than a stay — it’s your next favorite destination.",
      sub_text: "Whether it’s business or leisure, discover why guests keep coming back.",
      img: slide3,
    },
   
  ];
  

  return (
    <Swiper
      modules={[Autoplay]} // Add Autoplay module
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 5000, // Slide delay in ms
        disableOnInteraction: false, // Continue autoplay after user interaction
      }}
      loop={true}
      pagination={{ clickable: true }}>
      <Swiper>
        {data?.map((item) => {
          return (
            <SwiperSlide>
              <div
                className="relative w-full grid items-center justify-center h-[50vh] md:h-screen md:justify-start md:pl-36"
                key={item.id}
                style={{
                  backgroundImage: `url(${item.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}>
                <div className="absolute inset-0 bg-black opacity-40"></div>{" "}
                {/* Overlay */}
                <div className="grid gap-10 relative z-10">
                  {" "}
                  {/* Ensure content is above the overlay */}
                  <div className="grid gap-3">
                    <h1 className="text-5xl z-5 font-bold text-white md:text-8xl">
                      {item.name}
                    </h1>
                    <p className="hidden md:block text-[#DCDCDC] text-2xl">
                      {item.sub_text}
                    </p>
                  </div>
                  <div>
                    <Link href={`/rooms`}>
                      <button className="hidden md:block bg-white font-bold text-black border border-black px-14 py-4 rounded-full transition duration-300 ease-in-out hover:bg-black hover:text-white">
                        Book Now
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Swiper>
  );
};

export default SliderComponent;
