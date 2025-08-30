import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const logos = [
  "/logos/sim.png",
  "/logos/sopem.png",
  "/logos/defontaine.png",
  "/logos/decotools.png",
  "/logos/misfat.png"
];

export default function ClientsCarousel() {
  return (
    <Swiper slidesPerView={3} loop={true} autoplay={{ delay: 2000 }}>
      {logos.map((src) => (
        <SwiperSlide key={src}>
          <img src={src} alt="Client logo" className="h-16 mx-auto" loading="lazy" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
