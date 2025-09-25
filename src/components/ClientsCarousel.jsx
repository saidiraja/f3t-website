// src/components/ClientsCarousel.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { asset } from "../utils/asset";

const logos = [
  asset("logos/sim.png"),
  asset("logos/sopem.png"),
  asset("logos/defontaine.png"),
  asset("logos/decotools.png"),
  asset("logos/misfat.png"),
];

export default function ClientsCarousel() {
  return (
    <Swiper
      slidesPerView={3}
      loop={true}
      modules={[Autoplay]}
      autoplay={{ delay: 2000, disableOnInteraction: false }}
    >
      {logos.map((src) => (
        <SwiperSlide key={src}>
          <img src={src} alt="Client logo" className="h-16 mx-auto" loading="lazy" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
