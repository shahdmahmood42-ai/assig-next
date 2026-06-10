"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
export default function MySwiper({
  imagesList,
  spaceBetween = 50,
  slidesPerView = 1,
}: {
  imagesList: string[];
  spaceBetween?: number;
  slidesPerView?: number;
}) {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      navigation
      pagination={{
        clickable: true,
        renderBullet: function (index, className) {
          return `<span class="${className} w-5! h-2.5! bg-white! "></span>`;
        },
        bulletActiveClass: "w-10! bg-white! opacity-100! rounded-2xl!",
      }}
      loop
      // onSlideChange={() => console.log("slide change")}
      // onSwiper={(swiper) => console.log(swiper)}
    >
      {imagesList.map((imgSrc) => (
        <SwiperSlide key={imgSrc}>
          <img src={imgSrc} alt="" className="w-full h-120 object-cover" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
