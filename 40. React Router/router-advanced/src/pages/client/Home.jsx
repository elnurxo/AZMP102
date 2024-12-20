import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import controller from "../../services/api/api";
import { ENDPOINTS } from "../../constants";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination } from "swiper/modules";

const Home = () => {
  const [sliders, setSliders] = useState([]);

  useEffect(() => {
    const fetchSliders = async () => {
      const response = await controller.getAll(ENDPOINTS.sliders);
      setSliders([...response]);
    };
    fetchSliders();
  }, []);

  return (
    <>
      <Swiper
        style={{ width: "70%", height: "70vh",marginTop:'4%' }}
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        navigation={false}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        {sliders &&
          sliders.map((slide) => {
            return (
              <SwiperSlide style={{ height: "100%" }} key={slide.slide}>
                <img
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  src={slide.imageURL}
                  alt={slide.title}
                  title={slide.title}
                />
              </SwiperSlide>
            );
          })}
      </Swiper>
    </>
  );
};

export default Home;
